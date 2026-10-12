<?php

namespace App\Http\Controllers;

use App\Models\SectionHero;
use Illuminate\Http\Request;

class SectionHeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $heroSections = SectionHero::all();

        return response()->json($heroSections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'section_id' => 'required|exists:section,id',
            'eyebrow' => 'string|max:255',
            'hero_text' => 'required|string|max:255',
            'description' => 'string',
            'image_url' => 'string'
        ]);

        $section_hero = SectionHero::create($validated);

        return response()->json($section_hero);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $section_hero = SectionHero::findOrFail($id);

        return response()->json($section_hero);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $section_hero = SectionHero::findOrFail($id);

        $validated = $request->validate([
            'section_id' => 'required|exists:section,id',
            'eyebrow' => 'string|max:255',
            'hero_text' => 'required|string|max:255',
            'description' => 'string',
            'image_url' => 'string'
        ]);

        $section_hero->update($validated);

        return response()->json($section_hero);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        SectionHero::destroy($id);

        return response()->json(['message'=>'Deleted successfully']);
    }
}
