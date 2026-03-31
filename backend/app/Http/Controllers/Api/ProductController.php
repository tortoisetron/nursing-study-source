<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        // Bypass organization filtering to allow all products and categories to be seen on the public listing
        return response()->json(
            Product::withoutGlobalScopes()
                ->with(['category' => fn($q) => $q->withoutGlobalScopes()])
                ->latest()
                ->get()
        );
    }

    public function categories()
    {
        // Bypass organization filtering to allow all categories to be seen on the public listing
        return response()->json(\App\Models\Category::withoutGlobalScopes()->get(['id', 'name']));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'tag' => 'nullable|string|max:50',
            'image_url' => 'nullable|string',
            'file_path' => 'nullable|string',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product->load('category')
        ], 201);
    }

    public function show($id)
    {
        $product = Product::withoutGlobalScopes()
            ->with(['category' => fn($q) => $q->withoutGlobalScopes()])
            ->findOrFail($id);

        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|required|exists:categories,id',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'tag' => 'nullable|string|max:50',
            'image_url' => 'nullable|string',
            'file_path' => 'nullable|string',
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product->load('category')
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ]);
    }
}
