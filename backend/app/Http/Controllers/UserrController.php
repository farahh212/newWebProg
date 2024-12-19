<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\Userr;
use Illuminate\Http\Request;

class UserrController extends Controller
{
    //

     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $users=Userr::all();
        return response()->json($users);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //user name, password, user data, score and credit card
        $validatedData=$request->validate([
            'username'=>'required',
            'password'=>'required',
            'userdata'=>'required',
            'score'=>'numeric',
            'creditcard'=>'numeric'
        ]);
        $user=Userr::create($validatedData);
        return response()->json($product,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Userr::find($id);
        if(!$user){
            return response()->json(['message'=>'user not found'],404);
        }      
            return response()->json($user);           
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Userr::find($id);
        if(!$user){
            return response()->json(['message'=>'user not found'],404);

        }
        $validatedData=$request->validate([
            'username'=>'required',
            'password'=>'required',
            'userdata'=>'required',
            'score'=>'required',
            'creditcard'=>'required'

        ]);
        $user->update($validatedData);
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user=Userr::find($id);
        if(!$user){
            return response()->json(['message'=>'user not found'],404);

        }
        $user->delete();
        return response()->json(['message'=>'user deleted successfully']);
    }
}
