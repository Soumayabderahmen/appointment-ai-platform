@extends('Layouts.general')
@section('title')
Agents IA
@endsection
@section('page_description')

@endsection

@section('css')


@endsection

@section('content')

<div class="container-xxl flex-grow-1 container-p-y mt-0">
<liste-agents-ia
  :mesagents='@json($mesagents)'
  :marketplace-agents='@json($marketplaceAgents)'
  :categories='@json($categories)'
  :kpi-total-all='@json($kpi_total_all)'
  :kpi-total-mine='@json($kpi_total_mine)'
  :kpi-sales-rate='@json($kpi_sales_rate)'
></liste-agents-ia>
   <chatbotia  />

</div>

@endsection

@section('script')
  <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
@endsection
