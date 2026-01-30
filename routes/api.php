<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Chat\ChatController;
use App\Http\Controllers\Api\Admin\AgentController;
use App\Http\Controllers\Api\AgentIA\AvatarController;
use App\Http\Controllers\Api\Admin\CategorieController;
use App\Http\Controllers\Api\AgentIA\AgentIAController;
use App\Http\Controllers\Api\Admin\WorkflowN8NController;
use App\Http\Controllers\Api\AgentIA\RagSourceController;
use App\Http\Controllers\Api\Coach\DisponibiliteController;
use App\Http\Controllers\Api\Startup\PaiementApiController;
use App\Http\Controllers\Api\Admin\ActivationCompteController;
use App\Http\Controllers\Api\Admin\InvestisseurController;
use App\Http\Controllers\Api\Startup\ReservationApiController;
Route::prefix('admin')->group(function () {
    Route::prefix('agent')->group(function () {
        route::post('/', [AgentController::class, 'store']);
        route::get('/', [AgentController::class, 'index']);

        Route::prefix('{id}')->group(function () {
            Route::get('/', function ($id) {
                return \App\Models\Agent::with('sections.tasks')->findOrFail($id);
            });
            Route::delete('/', [AgentController::class, 'destroy']);
            Route::post('/update', [AgentController::class, 'update']);
        });
    });

    Route::prefix('activation/{id}')->group(function () {
        Route::post('/coach', [ActivationCompteController::class, 'activateCoach'])->name('admin.activation.coach');
        Route::post('/startup', [ActivationCompteController::class, 'activateStartup'])->name('admin.activation.startup');
        Route::post('/investisseur', [ActivationCompteController::class, 'activateInvestisseur'])->name('admin.activation.investisseur');
    });
    Route::prefix('profile')->group(function () {
        Route::post('/{id}', [ActivationCompteController::class, 'update']);
    });
});

Route::middleware(['web'])->prefix('coach')->group(function () {

    Route::prefix('availability')->group(function () {
        Route::post('/', [DisponibiliteController::class, 'store']);
        Route::prefix('{id}')->group(function () {
            Route::put('/update-times', [DisponibiliteController::class, 'updateTimes']);
            Route::put('/update-status', [DisponibiliteController::class, 'updateStatus']);
            Route::delete('/', [DisponibiliteController::class, 'destroy']);
            Route::get('/reservations-per-day', [DisponibiliteController::class, 'getReservationsByDate']);

        });
    });
});

Route::middleware(['web'])->prefix('startup')->group(function () {

    Route::prefix('reservation')->group(function () {
    Route::post('/', [ReservationApiController::class, 'store']);
    Route::post('/respond/{reservation}', [ReservationApiController::class, 'respond']);
    Route::delete('/{reservation}/delete', [ReservationApiController::class, 'destroy']);

    });
    Route::post('/paiement/{reservation}/checkout', [PaiementApiController::class, 'checkout'])->name('startup.paiement.checkout');

});

Route::middleware(['web'])->prefix('agentia')->group(function () {
    Route::post('/', [AgentIAController::class, 'store']);
   Route::post('/generate-prompt', [AgentIAController::class, 'generatePromptWithAI']);
    Route::post('/generate-avatar-prompt', [AgentIAController::class, 'generateAvatarPrompt']);
    Route::post('/avatar-from-image',[AgentIAController::class,'generateAvatarFromImage']);
    Route::get('/langues-voix',[AgentIAController::class,'languesDisponibles']);
    Route::get('/resemble-voices', [AgentIAController::class, 'getResembleVoices']);
    Route::post('/process-glb-url', [AgentIAController::class, 'processGlbUrl']);
    Route::get('/voice-by-avatar/{id}', [AgentIAController::class, 'getVoiceByAvatar']);
    Route::post('/generate-sample', [AgentIAController::class, 'generateVoiceSample']);
    Route::get('/clip-status/{clip_uuid}', [AgentIAController::class, 'getClipStatus']);
    Route::get('/show-projects-html', [AgentIAController::class, 'showProjectsHTML']);
    Route::get('/custom-voices', [AgentIAController::class, 'getCustomVoices']);
    Route::post('/create-custom-voice', [AgentIAController::class, 'createCustomVoice']);
});
Route::middleware(['web'])->prefix('rag_sources')->group(function () {
    Route::get('/{agentia}/index', [RagSourceController::class, 'index']);

});
Route::middleware(['web'])->prefix('categories')->group(function () {
    Route::post('/add', [CategorieController::class, 'store']);
    Route::get('/{category}', [CategorieController::class, 'show']);
    Route::put('/{category}/edit', [CategorieController::class, 'update']);
    Route::delete('/{category}/delete', [CategorieController::class, 'destroy']);
    Route::delete('/subcategories/{subcategory}/delete', [CategorieController::class, 'destroySubcategory']);
});

Route::post('/chat/ask', [ChatController::class, 'ask'])->name('chat.ask');

Route::post('/chat/president', [ChatController::class, 'president']);
Route::prefix('n8n')->group(function () {
    Route::get('/projects', [WorkflowN8NController::class, 'indexMyProjects']);
    Route::get('/projects/{projectId}/workflows', [WorkflowN8NController::class, 'indexWorkflowsByProject']);
    Route::post('/analyze', [WorkflowN8NController::class, 'analyzeUrl']);
    Route::post('/fundings', [InvestisseurController::class, 'store']);
});