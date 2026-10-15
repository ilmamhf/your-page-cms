<?php

namespace App\Http\Controllers;

use App\Http\Requests\SectionHeroRequest;
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
    public function store(SectionHeroRequest $request)
    {
        $section_hero = SectionHero::create($request->validated());

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
    public function update(SectionHeroRequest $request, string $id)
    {
        $section_hero = SectionHero::findOrFail($id);

        $section_hero->update($request->validated());

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
