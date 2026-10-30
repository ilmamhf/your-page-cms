<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SectionRequest;
use App\Http\Resources\CMSSectionResource;
use App\Http\Resources\SectionResource;
use App\Models\Metric;
use App\Models\Page;
use App\Models\Portofolio;
use App\Models\Section;
use App\Models\Service;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() // GET /sections
    {
        $sections = Section::all();

        return SectionResource::collection($sections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SectionRequest $request) // POST /section/{id}
    {
        $section = Section::create($request->validated());
        $section->load('hero');

        return response()->json([
            'message' => 'Section added successfully',
            'data' => new SectionResource($section),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $section = Section::findOrFail($id);

        return new SectionResource($section);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SectionRequest $request, string $id)
    {
        $section = Section::findOrFail($id);
        $data = $request->validated();

        DB::transaction(function () use ($section, $data) {
            $sectionData = Arr::only($data, [
                'page_id',
                'title',
                'subtitle',
                'section_type',
                'order',
                'is_active',
            ]);

            $section->update($sectionData);

            if (($data['section_type'] ?? null) === 'hero') {
                $heroInput = $data['hero_detail'] ?? [];

                // Explicit hero fields win; otherwise mirror the section's
                // title/subtitle so the two stay in sync.
                $heroData = [
                    'eyebrow' => $heroInput['eyebrow'] ?? null,
                    'image_url' => $heroInput['image_url'] ?? null,
                    'hero_text' => $heroInput['hero_text'] ?? $section->title,
                    'description' => $heroInput['description'] ?? $section->subtitle,
                ];

                $section->hero()->updateOrCreate(
                    ['section_id' => $section->id],
                    $heroData
                );
            }
        });

        return response()->json([
            'message' => 'Section edited successfully',
            'data' => new SectionResource($section->fresh()->load('hero')),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $section = Section::findOrFail($id);
        $section->delete();

        return response()->json(['message' => 'Section deleted successfully']);
    }

    // For Section List Page CMS
    public function cms()
    {
        $pages = Page::with([
            'sections' => function ($query) {
                $query->orderBy('order', 'asc');
            },
            'sections.hero',
        ])->get();
        $services = Service::all();
        $portofolios = Portofolio::all();
        $metrics = Metric::all();

        return new CMSSectionResource([
            'pages' => $pages,
            'services' => $services,
            'portofolios' => $portofolios,
            'metrics' => $metrics,
        ]);
    }
}
