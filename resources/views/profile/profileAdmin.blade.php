@extends('Layouts.general')
@section('title')
Mon Profile
@endsection

@section('content')
<div id="app" >
  <admin-profile
    :must-verify-email='@json($mustVerifyEmail)'
    :status='@json($status)'
     :user='@json($userInfo)'
    :role='@json($role)'>
  </admin-profile>
</div>
@endsection

@section('script')
@routes()
<script src="{{ mix('/js/app.js') }}"></script>
@endsection
