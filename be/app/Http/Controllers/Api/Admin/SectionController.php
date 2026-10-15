<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SectionRequest;
use App\Http\Resources\SectionResource;
use App\Models\Section;
use Illuminate\Http\Request;

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

        return response()->json([
            'message' => 'Section added successfully',
            'data' => new SectionResource($section)
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

        $section->update($request->validated());
        return response()->json([
            'message' => 'Section edited successfully',
            'data' => new SectionResource($section)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Section::destroy($id);

        return response()->json(['message' => 'Section deleted successfully']);
    }
}
