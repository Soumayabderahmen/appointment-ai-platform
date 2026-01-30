@component('mail::message')
# 🧾 Nouvelle Réservation Confirmée

Bonjour Coach,

Une nouvelle réservation a été **payée avec succès** par {{ $reservation->startup->user->name ?? 'un utilisateur' }}.

**Détails :**
- 📅 Date : {{ \Carbon\Carbon::parse($reservation->meeting_time)->translatedFormat('d F Y à H:i') }}
- ⏱️ Durée : {{ $reservation->duration }} minutes
- 💰 Montant : {{ $reservation->total }} €
- 🔗 Lien de réunion : [Accéder à la réunion]({{ $reservation->meeting_url }})

Merci de préparer votre session.

@component('mail::button', ['url' => $reservation->meeting_url])
Rejoindre la réunion
@endcomponent

Cordialement,  
L'équipe BrainCode
@endcomponent
