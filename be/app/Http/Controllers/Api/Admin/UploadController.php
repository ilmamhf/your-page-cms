<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    /**
     * POST /api/upload
     *
     * Stores an image on the public disk and returns its absolute URL.
     * Run `php artisan storage:link` once so the files are web-accessible.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image|mimes:jpg,jpeg,png,gif,webp,svg+xml|max:5120',
        ]);

        $path = $request->file('image')->store('uploads', 'public');

        return response()->json([
            'message' => 'Image uploaded successfully',
            'data' => [
                'url' => asset('storage/'.$path),
                'path' => $path,
            ],
        ]);
    }

    /**
     * DELETE /api/upload
     *
     * Removes a previously uploaded file (accepts the full URL or the raw path).
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'path' => 'required|string|max:2048',
        ]);

        $path = $request->input('path');

        // Accept both ".../storage/uploads/abc.png" and "uploads/abc.png".
        $path = parse_url($path, PHP_URL_PATH) ?? $path;
        $path = ltrim(str_replace(asset('storage'), '', $path), '/');

        if (str_starts_with($path, 'uploads/') && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);

            return response()->json(['message' => 'Image deleted successfully']);
        }

        return response()->json(['message' => 'File not found'], 404);
    }
}
