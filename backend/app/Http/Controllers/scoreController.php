<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class scoreController extends Controller
{
    //

    public function index()
    {
        //import the products model
        $scores=score::all();
        return response()->json($score);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData=$request->validate([
            'name'=>'required',
            'username'=>'required',
            'score'=>'numeric'
           
        ]);
        $score=score::create($validatedData);
        return response()->json($score,201);
    }

    /**
     * Display the specified resource.
     */
/**
 * Display the top 3 scores along with usernames.
 */
public function showTopScores()
{
    // Fetch all scores sorted by 'score' in descending order
    $topScores = Score::orderBy('score', 'desc')->take(1)->get(['name', 'score']);

    // Create an array to store the concatenated result
    $maxScores = [];

    // Loop through the top scores and concatenate usernames with scores
    foreach ($topScores as $entry) {
        $maxScores[] = $entry->name . ' ' . $entry->score;
    }

    // Return the result as a JSON response
    return response()->json($maxScores);
}


}