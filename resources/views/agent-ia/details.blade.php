@extends('Layouts.general')
@section('title')
Agent IA
@endsection
@section('page_description')

@endsection

@section('css')


@endsection

@section('content')

<div class="container-xxl flex-grow-1 container-p-y mt-0">
  <details-agent-ia :agent='@json($agent)':is-owner='@json($isOwner)'  :sources='@json($sources)'
></details-agents-ia>></details-agent-ia>
</div>

@endsection

@section('script')
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
@endsection
