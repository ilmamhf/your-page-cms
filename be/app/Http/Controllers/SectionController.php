<?php

namespace App\Http\Controllers;

use App\Http\Requests\SectionRequest;
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

        return response()->json($sections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SectionRequest $request) // POST /section/{id}
    {
        $section = Section::create($request->validated());

        return response()->json($section, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $section = Section::findOrFail($id);

        return response()->json($section, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SectionRequest $request, string $id)
    {
        $section = Section::findOrFail($id);

        $section->update($request->validated());
        return response()->json($section);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Section::destroy($id);

        return response()->json(['message' => 'Deleted successfully']);
    }
}
