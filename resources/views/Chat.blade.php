@extends('Layouts.general')
@section('title')
Chat
@endsection
@section('page_description')

@endsection

@section('css')


@endsection

@section('content')
<div>
<div class="container-xxl flex-grow-1 container-p-y mt-0">
<chat :agent='@json($agent)'></chat>

</div>

@endsection
@section('script')
    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
@endsection

