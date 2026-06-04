import type { LangCode } from "./i18n";

export type ManualBlock = { p: string } | { ul: string[] };
export type ManualSection = { heading: string; blocks: ManualBlock[] };
export type ManualContent = {
  back: string;
  title: string;
  subtitle: string;
  version: string;
  sections: ManualSection[];
};

const en: ManualContent = {
  back: "← Back to Player",
  title: "SUNO Playlist Player — User Manual",
  subtitle: "A complete guide to every feature of the app, on desktop and mobile.",
  version: "v1.0",
  sections: [
    {
      heading: "1. Overview",
      blocks: [
        { p: "SUNO Playlist Player lets you collect, organize, and play music tracks hosted on <strong>suno.com</strong>. Paste a SUNO link and the app fetches its title, cover art, and audio so you can build playlists grouped into folders." },
      ],
    },
    {
      heading: "2. Adding Songs",
      blocks: [
        { p: "<strong>Auto-load mode:</strong> Paste one or more SUNO URLs (one per line). The app automatically fetches each track's metadata (title, cover image, audio) and adds it to your current folder." },
        { p: "<strong>Manual mode:</strong> Paste a SUNO URL and provide a custom title. Useful when you want to override SUNO's default name." },
        { p: "Both modes work identically on desktop and on mobile devices." },
      ],
    },
    {
      heading: "3. Folders",
      blocks: [
        { ul: [
          "<strong>Create folder</strong> — group related songs together.",
          "<strong>Rename / delete</strong> folders at any time.",
          "The folder containing the currently playing song <strong>opens automatically</strong>.",
          "Tapping the player jumps to that song's folder and collapses the others.",
          "On reload, all folders start <strong>collapsed</strong>.",
        ] },
      ],
    },
    {
      heading: "4. The Player",
      blocks: [
        { p: "The player bar shows the current song's cover art and title. Controls:" },
        { ul: [
          "<strong>Previous folder</strong> — jump to the first song of the previous folder.",
          "<strong>Previous song</strong>",
          "<strong>Play / Pause</strong>",
          "<strong>Next song</strong>",
          "<strong>Next folder</strong> — jump to the first song of the next folder.",
          "<strong>Shuffle</strong> — randomize playback order.",
          "<strong>Stop</strong> — halt playback.",
        ] },
        { p: "Tap the player itself to locate the playing track in the playlist." },
      ],
    },
    {
      heading: "5. Reordering & Editing",
      blocks: [
        { p: "Drag songs to reorder them within or between folders. Each song can be renamed, moved, or removed. The original order is preserved so you can revert to it." },
      ],
    },
    {
      heading: "6. Save & Load Playlists",
      blocks: [
        { p: "<strong>Save Playlist</strong> exports your entire library — folders <em>and</em> the full song data (id, URL, audio URL, title, cover image, folder assignment) — as a JSON file you can back up or share." },
        { p: "<strong>Load Playlist</strong> restores it exactly as saved, including titles and cover art. Missing fields in older files are auto-refetched from SUNO." },
      ],
    },
    {
      heading: "7. Cover Art",
      blocks: [
        { p: "Every song displays its SUNO poster both in the playlist and in the player bar, on desktop and mobile. Cached older entries are backfilled automatically when the page loads." },
      ],
    },
    {
      heading: "8. Appearance & Language",
      blocks: [
        { ul: [
          "<strong>Theme toggle</strong> — switch between light and dark modes.",
          "<strong>Language selector</strong> — multilingual UI with RTL support for applicable languages.",
          "<strong>Color scheme selector</strong> — choose from six palettes (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) that tint the interface in both dark and light modes. Your choice is saved in the browser and inside playlist exports.",
        ] },
      ],
    },
    {
      heading: "9. Mobile Web App",
      blocks: [
        { p: "The app is fully responsive. Add songs (Auto-load and Manual), build folders, play, shuffle, save, and load playlists from any phone browser — same features as desktop." },
      ],
    },
    {
      heading: "10. About & Disclaimer",
      blocks: [
        { p: "SUNO Playlist Player is an independent web app for organizing personal SUNO links. It does not host audio; playback streams directly from SUNO. All trademarks belong to their respective owners." },
      ],
    },
  ],
};

const es: ManualContent = {
  back: "← Volver al reproductor",
  title: "Reproductor de listas SUNO — Manual de usuario",
  subtitle: "Guía completa de todas las funciones, en escritorio y móvil.",
  version: "v1.0",
  sections: [
    { heading: "1. Visión general", blocks: [
      { p: "El Reproductor de listas SUNO te permite recopilar, organizar y reproducir pistas alojadas en <strong>suno.com</strong>. Pega un enlace de SUNO y la app obtiene el título, la portada y el audio para crear listas agrupadas en carpetas." },
    ]},
    { heading: "2. Añadir canciones", blocks: [
      { p: "<strong>Modo auto-carga:</strong> Pega una o varias URLs de SUNO (una por línea). La app obtiene los metadatos de cada pista (título, portada, audio) y la añade a la carpeta actual." },
      { p: "<strong>Modo manual:</strong> Pega una URL de SUNO y proporciona un título personalizado. Útil para sustituir el nombre por defecto de SUNO." },
      { p: "Ambos modos funcionan igual en escritorio y móvil." },
    ]},
    { heading: "3. Carpetas", blocks: [
      { ul: [
        "<strong>Crear carpeta</strong> — agrupa canciones relacionadas.",
        "<strong>Renombrar / eliminar</strong> carpetas en cualquier momento.",
        "La carpeta que contiene la canción en reproducción <strong>se abre automáticamente</strong>.",
        "Al pulsar el reproductor saltas a la carpeta de esa canción y las demás se colapsan.",
        "Al recargar, todas las carpetas se inician <strong>colapsadas</strong>.",
      ]},
    ]},
    { heading: "4. El reproductor", blocks: [
      { p: "La barra muestra la portada y el título. Controles:" },
      { ul: [
        "<strong>Carpeta anterior</strong> — salta a la primera canción de la carpeta previa.",
        "<strong>Canción anterior</strong>",
        "<strong>Reproducir / Pausa</strong>",
        "<strong>Siguiente canción</strong>",
        "<strong>Carpeta siguiente</strong> — salta a la primera canción de la siguiente carpeta.",
        "<strong>Aleatorio</strong> — orden de reproducción al azar.",
        "<strong>Detener</strong> — para la reproducción.",
      ]},
      { p: "Pulsa el reproductor para localizar la pista en la lista." },
    ]},
    { heading: "5. Reordenar y editar", blocks: [
      { p: "Arrastra canciones para reordenarlas dentro o entre carpetas. Cada canción se puede renombrar, mover o eliminar. El orden original se conserva para poder restaurarlo." },
    ]},
    { heading: "6. Guardar y cargar listas", blocks: [
      { p: "<strong>Guardar lista</strong> exporta toda tu biblioteca — carpetas <em>y</em> los datos completos de cada canción — como un archivo JSON que puedes respaldar o compartir." },
      { p: "<strong>Cargar lista</strong> la restaura tal cual, con títulos y portadas. Los campos faltantes en archivos antiguos se vuelven a obtener de SUNO." },
    ]},
    { heading: "7. Portadas", blocks: [
      { p: "Cada canción muestra su portada de SUNO tanto en la lista como en el reproductor, en escritorio y móvil. Las entradas antiguas en caché se completan automáticamente al cargar la página." },
    ]},
    { heading: "8. Apariencia e idioma", blocks: [
      { ul: [
        "<strong>Cambio de tema</strong> — alterna entre modo claro y oscuro.",
        "<strong>Selector de idioma</strong> — interfaz multilingüe con soporte RTL.",
        "<strong>Selector de esquema de color</strong> — elige entre seis paletas (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) que teñen la interfaz en modo oscuro y claro. Tu elección se guarda en el navegador y en las exportaciones de playlists.",
      ]},
    ]},
    { heading: "9. App web móvil", blocks: [
      { p: "La app es totalmente responsiva. Añade canciones, crea carpetas, reproduce, mezcla, guarda y carga listas desde cualquier navegador móvil — las mismas funciones que en escritorio." },
    ]},
    { heading: "10. Acerca de y aviso legal", blocks: [
      { p: "El Reproductor de listas SUNO es una app web independiente para organizar enlaces personales de SUNO. No aloja audio; la reproducción se transmite desde SUNO. Las marcas pertenecen a sus respectivos propietarios." },
    ]},
  ],
};

const pt: ManualContent = {
  back: "← Voltar ao reprodutor",
  title: "Reprodutor de listas SUNO — Manual do utilizador",
  subtitle: "Guia completo de todas as funcionalidades, no computador e telemóvel.",
  version: "v1.0",
  sections: [
    { heading: "1. Visão geral", blocks: [
      { p: "O Reprodutor de listas SUNO permite reunir, organizar e tocar faixas hospedadas em <strong>suno.com</strong>. Cole um link do SUNO e a app obtém o título, capa e áudio para criar listas agrupadas em pastas." },
    ]},
    { heading: "2. Adicionar músicas", blocks: [
      { p: "<strong>Modo auto-carregar:</strong> Cole uma ou mais URLs do SUNO (uma por linha). A app obtém os metadados de cada faixa (título, capa, áudio) e adiciona à pasta atual." },
      { p: "<strong>Modo manual:</strong> Cole uma URL do SUNO e forneça um título personalizado. Útil para substituir o nome padrão do SUNO." },
      { p: "Ambos os modos funcionam de forma idêntica em desktop e mobile." },
    ]},
    { heading: "3. Pastas", blocks: [
      { ul: [
        "<strong>Criar pasta</strong> — agrupa músicas relacionadas.",
        "<strong>Renomear / eliminar</strong> pastas a qualquer momento.",
        "A pasta com a música a tocar <strong>abre-se automaticamente</strong>.",
        "Tocar no reprodutor salta para a pasta dessa música e recolhe as outras.",
        "Ao recarregar, todas as pastas começam <strong>recolhidas</strong>.",
      ]},
    ]},
    { heading: "4. O reprodutor", blocks: [
      { p: "A barra mostra a capa e o título. Controlos:" },
      { ul: [
        "<strong>Pasta anterior</strong> — salta para a primeira música da pasta anterior.",
        "<strong>Música anterior</strong>",
        "<strong>Tocar / Pausar</strong>",
        "<strong>Próxima música</strong>",
        "<strong>Próxima pasta</strong> — salta para a primeira música da próxima pasta.",
        "<strong>Aleatório</strong> — ordem aleatória de reprodução.",
        "<strong>Parar</strong> — interrompe a reprodução.",
      ]},
      { p: "Toque no reprodutor para localizar a faixa na lista." },
    ]},
    { heading: "5. Reordenar e editar", blocks: [
      { p: "Arraste músicas para reordená-las dentro ou entre pastas. Cada música pode ser renomeada, movida ou removida. A ordem original é preservada para poder ser restaurada." },
    ]},
    { heading: "6. Guardar e carregar listas", blocks: [
      { p: "<strong>Guardar lista</strong> exporta toda a biblioteca — pastas <em>e</em> dados completos das músicas — como um ficheiro JSON para backup ou partilha." },
      { p: "<strong>Carregar lista</strong> restaura tudo, incluindo títulos e capas. Campos em falta em ficheiros antigos são obtidos novamente do SUNO." },
    ]},
    { heading: "7. Capas", blocks: [
      { p: "Cada música exibe a capa SUNO tanto na lista como na barra do reprodutor, em desktop e mobile. Entradas antigas em cache são preenchidas automaticamente ao carregar a página." },
    ]},
    { heading: "8. Aparência e idioma", blocks: [
      { ul: [
        "<strong>Alternar tema</strong> — modo claro ou escuro.",
        "<strong>Seletor de idioma</strong> — interface multilingue com suporte RTL.",
        "<strong>Seletor de esquema de cor</strong> — escolhe entre seis paletas (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) que colorizam a interface em modo escuro e claro. A escolha é guardada no navegador e nas exportações de playlists.",
      ]},
    ]},
    { heading: "9. App web mobile", blocks: [
      { p: "A app é totalmente responsiva. Adicione músicas, crie pastas, reproduza, embaralhe, guarde e carregue listas em qualquer browser móvel — as mesmas funcionalidades do desktop." },
    ]},
    { heading: "10. Sobre e aviso", blocks: [
      { p: "O Reprodutor de listas SUNO é uma app web independente para organizar links pessoais do SUNO. Não hospeda áudio; a reprodução é transmitida diretamente do SUNO. Marcas registadas pertencem aos respetivos proprietários." },
    ]},
  ],
};

const it: ManualContent = {
  back: "← Torna al player",
  title: "SUNO Playlist Player — Manuale utente",
  subtitle: "Guida completa a tutte le funzioni, su desktop e mobile.",
  version: "v1.0",
  sections: [
    { heading: "1. Panoramica", blocks: [
      { p: "SUNO Playlist Player ti permette di raccogliere, organizzare e ascoltare brani ospitati su <strong>suno.com</strong>. Incolla un link SUNO e l'app recupera titolo, copertina e audio per creare playlist raggruppate in cartelle." },
    ]},
    { heading: "2. Aggiungere brani", blocks: [
      { p: "<strong>Modalità auto-caricamento:</strong> Incolla uno o più URL SUNO (uno per riga). L'app recupera automaticamente i metadati di ogni brano e lo aggiunge alla cartella corrente." },
      { p: "<strong>Modalità manuale:</strong> Incolla un URL SUNO e fornisci un titolo personalizzato. Utile per sovrascrivere il nome predefinito di SUNO." },
      { p: "Entrambe le modalità funzionano allo stesso modo su desktop e mobile." },
    ]},
    { heading: "3. Cartelle", blocks: [
      { ul: [
        "<strong>Crea cartella</strong> — raggruppa brani correlati.",
        "<strong>Rinomina / elimina</strong> cartelle in qualsiasi momento.",
        "La cartella del brano in riproduzione <strong>si apre automaticamente</strong>.",
        "Toccando il player si salta alla cartella di quel brano e le altre si chiudono.",
        "Al ricaricamento, tutte le cartelle iniziano <strong>chiuse</strong>.",
      ]},
    ]},
    { heading: "4. Il player", blocks: [
      { p: "La barra mostra copertina e titolo. Comandi:" },
      { ul: [
        "<strong>Cartella precedente</strong> — vai al primo brano della cartella precedente.",
        "<strong>Brano precedente</strong>",
        "<strong>Play / Pausa</strong>",
        "<strong>Brano successivo</strong>",
        "<strong>Cartella successiva</strong> — vai al primo brano della cartella successiva.",
        "<strong>Casuale</strong> — riproduzione in ordine casuale.",
        "<strong>Stop</strong> — ferma la riproduzione.",
      ]},
      { p: "Tocca il player per localizzare il brano nella playlist." },
    ]},
    { heading: "5. Riordina e modifica", blocks: [
      { p: "Trascina i brani per riordinarli nelle cartelle. Ogni brano può essere rinominato, spostato o rimosso. L'ordine originale è preservato per il ripristino." },
    ]},
    { heading: "6. Salva e carica playlist", blocks: [
      { p: "<strong>Salva playlist</strong> esporta l'intera libreria — cartelle <em>e</em> dati completi dei brani — come file JSON per backup o condivisione." },
      { p: "<strong>Carica playlist</strong> ripristina tutto come salvato. Campi mancanti in file vecchi vengono recuperati di nuovo da SUNO." },
    ]},
    { heading: "7. Copertine", blocks: [
      { p: "Ogni brano mostra la copertina SUNO sia nella playlist sia nella barra del player, su desktop e mobile. Le voci in cache vengono completate automaticamente al caricamento." },
    ]},
    { heading: "8. Aspetto e lingua", blocks: [
      { ul: [
        "<strong>Tema</strong> — alterna tra chiaro e scuro.",
        "<strong>Selettore lingua</strong> — interfaccia multilingue con supporto RTL.",
        "<strong>Selettore schema colore</strong> — scegli tra sei palette (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) che tingono l'interfaccia in modalità scura e chiara. La scelta viene salvata nel browser e nelle esportazioni delle playlist.",
      ]},
    ]},
    { heading: "9. App web mobile", blocks: [
      { p: "L'app è completamente responsive. Aggiungi brani, crea cartelle, riproduci, mescola, salva e carica playlist da qualsiasi browser mobile — stesse funzioni del desktop." },
    ]},
    { heading: "10. Informazioni e avvertenze", blocks: [
      { p: "SUNO Playlist Player è un'app web indipendente per organizzare link SUNO personali. Non ospita audio; la riproduzione avviene direttamente da SUNO. I marchi appartengono ai rispettivi proprietari." },
    ]},
  ],
};

const de: ManualContent = {
  back: "← Zurück zum Player",
  title: "SUNO Playlist Player — Benutzerhandbuch",
  subtitle: "Vollständige Anleitung zu allen Funktionen auf Desktop und Mobil.",
  version: "v1.0",
  sections: [
    { heading: "1. Überblick", blocks: [
      { p: "Mit dem SUNO Playlist Player kannst du Tracks von <strong>suno.com</strong> sammeln, organisieren und abspielen. Füge einen SUNO-Link ein und die App lädt Titel, Cover und Audio, sodass du in Ordnern gruppierte Playlists erstellst." },
    ]},
    { heading: "2. Songs hinzufügen", blocks: [
      { p: "<strong>Auto-Lade-Modus:</strong> Füge eine oder mehrere SUNO-URLs ein (eine pro Zeile). Die App lädt automatisch die Metadaten und fügt jeden Track zur aktuellen Ordner hinzu." },
      { p: "<strong>Manueller Modus:</strong> Füge eine SUNO-URL ein und gib einen eigenen Titel an. Nützlich, um den Standardnamen zu überschreiben." },
      { p: "Beide Modi funktionieren auf Desktop und Mobil identisch." },
    ]},
    { heading: "3. Ordner", blocks: [
      { ul: [
        "<strong>Ordner erstellen</strong> — Songs gruppieren.",
        "<strong>Umbenennen / löschen</strong> jederzeit möglich.",
        "Der Ordner des aktuell laufenden Songs <strong>öffnet sich automatisch</strong>.",
        "Tippen auf den Player springt zum Ordner dieses Songs und schließt die anderen.",
        "Beim Neuladen sind alle Ordner <strong>geschlossen</strong>.",
      ]},
    ]},
    { heading: "4. Der Player", blocks: [
      { p: "Die Player-Leiste zeigt Cover und Titel. Steuerung:" },
      { ul: [
        "<strong>Vorheriger Ordner</strong> — zum ersten Song des vorherigen Ordners.",
        "<strong>Vorheriger Song</strong>",
        "<strong>Play / Pause</strong>",
        "<strong>Nächster Song</strong>",
        "<strong>Nächster Ordner</strong> — zum ersten Song des nächsten Ordners.",
        "<strong>Zufall</strong> — zufällige Reihenfolge.",
        "<strong>Stopp</strong> — Wiedergabe beenden.",
      ]},
      { p: "Tippe auf den Player, um den Track in der Playlist zu finden." },
    ]},
    { heading: "5. Sortieren & Bearbeiten", blocks: [
      { p: "Ziehe Songs, um sie innerhalb oder zwischen Ordnern neu anzuordnen. Jeder Song kann umbenannt, verschoben oder entfernt werden. Die Originalreihenfolge bleibt erhalten." },
    ]},
    { heading: "6. Playlists speichern & laden", blocks: [
      { p: "<strong>Playlist speichern</strong> exportiert deine gesamte Bibliothek — Ordner <em>und</em> alle Songdaten — als JSON-Datei zum Sichern oder Teilen." },
      { p: "<strong>Playlist laden</strong> stellt alles wieder her, inklusive Titel und Cover. Fehlende Felder in älteren Dateien werden automatisch von SUNO nachgeladen." },
    ]},
    { heading: "7. Cover", blocks: [
      { p: "Jeder Song zeigt sein SUNO-Cover sowohl in der Playlist als auch in der Player-Leiste, auf Desktop und Mobil. Ältere Cache-Einträge werden beim Laden automatisch ergänzt." },
    ]},
    { heading: "8. Darstellung & Sprache", blocks: [
      { ul: [
        "<strong>Theme-Umschalter</strong> — heller oder dunkler Modus.",
        "<strong>Sprachauswahl</strong> — mehrsprachige UI mit RTL-Unterstützung.",
        "<strong>Farbschema-Auswahl</strong> — wähle aus sechs Paletten (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose), die die Oberfläche im dunklen und hellen Modus einfärben. Die Wahl wird im Browser und in Playlist-Exporten gespeichert.",
      ]},
    ]},
    { heading: "9. Mobile Web-App", blocks: [
      { p: "Die App ist voll responsiv. Songs hinzufügen, Ordner erstellen, abspielen, mischen, speichern und laden — vom Smartphone-Browser mit denselben Funktionen wie auf dem Desktop." },
    ]},
    { heading: "10. Über & Haftungsausschluss", blocks: [
      { p: "Der SUNO Playlist Player ist eine unabhängige Web-App zum Organisieren persönlicher SUNO-Links. Audio wird nicht gehostet; die Wiedergabe streamt direkt von SUNO. Alle Marken gehören ihren jeweiligen Inhabern." },
    ]},
  ],
};

const fr: ManualContent = {
  back: "← Retour au lecteur",
  title: "Lecteur de playlist SUNO — Manuel utilisateur",
  subtitle: "Guide complet de toutes les fonctionnalités, sur ordinateur et mobile.",
  version: "v1.0",
  sections: [
    { heading: "1. Présentation", blocks: [
      { p: "Le Lecteur de playlist SUNO vous permet de collecter, organiser et écouter des morceaux hébergés sur <strong>suno.com</strong>. Collez un lien SUNO et l'application récupère titre, pochette et audio pour créer des playlists groupées en dossiers." },
    ]},
    { heading: "2. Ajouter des morceaux", blocks: [
      { p: "<strong>Mode auto-chargement :</strong> Collez une ou plusieurs URLs SUNO (une par ligne). L'application récupère automatiquement les métadonnées et ajoute chaque morceau au dossier courant." },
      { p: "<strong>Mode manuel :</strong> Collez une URL SUNO et fournissez un titre personnalisé. Utile pour remplacer le nom par défaut." },
      { p: "Les deux modes fonctionnent à l'identique sur ordinateur et mobile." },
    ]},
    { heading: "3. Dossiers", blocks: [
      { ul: [
        "<strong>Créer un dossier</strong> — regrouper des morceaux.",
        "<strong>Renommer / supprimer</strong> à tout moment.",
        "Le dossier contenant le morceau en cours <strong>s'ouvre automatiquement</strong>.",
        "Toucher le lecteur saute au dossier de ce morceau et replie les autres.",
        "Au rechargement, tous les dossiers sont <strong>repliés</strong>.",
      ]},
    ]},
    { heading: "4. Le lecteur", blocks: [
      { p: "La barre affiche pochette et titre. Commandes :" },
      { ul: [
        "<strong>Dossier précédent</strong> — premier morceau du dossier précédent.",
        "<strong>Morceau précédent</strong>",
        "<strong>Lecture / Pause</strong>",
        "<strong>Morceau suivant</strong>",
        "<strong>Dossier suivant</strong> — premier morceau du dossier suivant.",
        "<strong>Aléatoire</strong> — ordre de lecture aléatoire.",
        "<strong>Stop</strong> — arrêter la lecture.",
      ]},
      { p: "Touchez le lecteur pour repérer le morceau dans la playlist." },
    ]},
    { heading: "5. Réorganiser et modifier", blocks: [
      { p: "Faites glisser les morceaux pour les réorganiser dans ou entre les dossiers. Chacun peut être renommé, déplacé ou supprimé. L'ordre d'origine est conservé." },
    ]},
    { heading: "6. Sauvegarder et charger les playlists", blocks: [
      { p: "<strong>Enregistrer la playlist</strong> exporte toute la bibliothèque — dossiers <em>et</em> données complètes — en fichier JSON pour sauvegarde ou partage." },
      { p: "<strong>Charger la playlist</strong> restaure tout tel quel, titres et pochettes inclus. Les champs manquants des anciens fichiers sont récupérés à nouveau depuis SUNO." },
    ]},
    { heading: "7. Pochettes", blocks: [
      { p: "Chaque morceau affiche sa pochette SUNO dans la playlist et dans la barre du lecteur, sur ordinateur et mobile. Les anciennes entrées en cache sont complétées automatiquement au chargement." },
    ]},
    { heading: "8. Apparence et langue", blocks: [
      { ul: [
        "<strong>Thème</strong> — clair ou sombre.",
        "<strong>Sélecteur de langue</strong> — interface multilingue avec support RTL.",
        "<strong>Sélecteur de schéma de couleurs</strong> — choisissez parmi six palettes (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) qui teintent l'interface en mode sombre et clair. Votre choix est enregistré dans le navigateur et dans les exports de playlists.",
      ]},
    ]},
    { heading: "9. Application web mobile", blocks: [
      { p: "L'application est entièrement responsive. Ajoutez des morceaux, créez des dossiers, lisez, mélangez, sauvegardez et chargez des playlists depuis n'importe quel navigateur mobile." },
    ]},
    { heading: "10. À propos et avertissement", blocks: [
      { p: "Le Lecteur de playlist SUNO est une application web indépendante pour organiser vos liens SUNO. Il n'héberge pas l'audio ; la lecture est diffusée directement depuis SUNO. Les marques appartiennent à leurs propriétaires respectifs." },
    ]},
  ],
};

const zh: ManualContent = {
  back: "← 返回播放器",
  title: "SUNO 播放列表播放器 — 用户手册",
  subtitle: "桌面和移动端所有功能的完整指南。",
  version: "v1.0",
  sections: [
    { heading: "1. 概览", blocks: [
      { p: "SUNO 播放列表播放器让你收集、整理并播放 <strong>suno.com</strong> 上的音乐。粘贴 SUNO 链接，应用会自动获取标题、封面和音频，以便你将播放列表按文件夹分组。" },
    ]},
    { heading: "2. 添加歌曲", blocks: [
      { p: "<strong>自动加载模式：</strong> 粘贴一个或多个 SUNO 链接（每行一个）。应用会自动获取每首曲目的元数据并加入当前文件夹。" },
      { p: "<strong>手动模式：</strong> 粘贴 SUNO 链接并提供自定义标题，便于覆盖默认名称。" },
      { p: "两种模式在桌面和移动端的表现一致。" },
    ]},
    { heading: "3. 文件夹", blocks: [
      { ul: [
        "<strong>创建文件夹</strong> — 把相关歌曲分组。",
        "<strong>重命名 / 删除</strong> 文件夹随时进行。",
        "正在播放的歌曲所在文件夹会<strong>自动展开</strong>。",
        "点击播放器跳转到该歌曲的文件夹并折叠其他文件夹。",
        "刷新页面后，所有文件夹默认<strong>折叠</strong>。",
      ]},
    ]},
    { heading: "4. 播放器", blocks: [
      { p: "播放栏显示封面和标题。控件：" },
      { ul: [
        "<strong>上一文件夹</strong> — 跳到上一个文件夹的第一首。",
        "<strong>上一首</strong>",
        "<strong>播放 / 暂停</strong>",
        "<strong>下一首</strong>",
        "<strong>下一文件夹</strong> — 跳到下一个文件夹的第一首。",
        "<strong>随机播放</strong>",
        "<strong>停止</strong>",
      ]},
      { p: "点击播放器即可在列表中定位当前曲目。" },
    ]},
    { heading: "5. 重新排序与编辑", blocks: [
      { p: "拖动歌曲在文件夹内或跨文件夹排序。每首歌可以重命名、移动或删除，原始顺序会被保留以便恢复。" },
    ]},
    { heading: "6. 保存和加载播放列表", blocks: [
      { p: "<strong>保存播放列表</strong> 将整个库（文件夹和完整歌曲数据）导出为 JSON 文件用于备份或分享。" },
      { p: "<strong>加载播放列表</strong> 完整还原，包括标题和封面。旧文件中缺失的字段会自动从 SUNO 重新获取。" },
    ]},
    { heading: "7. 封面", blocks: [
      { p: "每首歌会在播放列表和播放栏中显示其 SUNO 封面，桌面和移动端均如此。旧缓存条目会在页面加载时自动补全。" },
    ]},
    { heading: "8. 外观与语言", blocks: [
      { ul: [
        "<strong>主题切换</strong> — 在浅色和深色模式之间切换。",
        "<strong>语言选择器</strong> — 多语言界面，支持 RTL。",
        "<strong>配色方案选择器</strong> — 从六种调色板中选择（Emerald、Ocean、Sunset、Lavender、Noir Gold、Rose），为深色和浅色模式下的界面着色。你的选择会保存在浏览器和播放列表导出文件中。",
      ]},
    ]},
    { heading: "9. 移动 Web 应用", blocks: [
      { p: "应用完全响应式。可在任何手机浏览器中添加歌曲、创建文件夹、播放、随机、保存和加载播放列表 — 与桌面端功能相同。" },
    ]},
    { heading: "10. 关于与免责声明", blocks: [
      { p: "SUNO 播放列表播放器是一个独立的 Web 应用，用于整理个人 SUNO 链接。它不托管音频；播放直接来自 SUNO。所有商标归各自所有者所有。" },
    ]},
  ],
};

const yue: ManualContent = {
  back: "← 返返播放器",
  title: "SUNO 播放清單播放器 — 用戶手冊",
  subtitle: "電腦同手機所有功能嘅完整指南。",
  version: "v1.0",
  sections: [
    { heading: "1. 概覽", blocks: [
      { p: "SUNO 播放清單播放器俾你收集、整理同播放 <strong>suno.com</strong> 上嘅音樂。貼個 SUNO 連結，App 就會自動攞返標題、封面同音檔，等你可以將播放清單分組入唔同資料夾。" },
    ]},
    { heading: "2. 加入歌曲", blocks: [
      { p: "<strong>自動載入模式：</strong> 貼一個或多個 SUNO 網址（每行一個）。App 會自動攞每首歌嘅資料加入而家嘅資料夾。" },
      { p: "<strong>手動模式：</strong> 貼 SUNO 網址再自訂標題，可以覆蓋 SUNO 預設名。" },
      { p: "兩種模式喺電腦同手機嘅運作完全一樣。" },
    ]},
    { heading: "3. 資料夾", blocks: [
      { ul: [
        "<strong>新增資料夾</strong> — 將相關歌曲分組。",
        "<strong>改名 / 刪除</strong> 資料夾隨時可以做。",
        "播緊歌嘅資料夾會<strong>自動打開</strong>。",
        "撳播放器就會跳去嗰首歌嘅資料夾，其他自動收埋。",
        "重新載入後，所有資料夾預設<strong>收埋</strong>。",
      ]},
    ]},
    { heading: "4. 播放器", blocks: [
      { p: "播放欄會顯示封面同標題。控制鍵：" },
      { ul: [
        "<strong>上一個資料夾</strong> — 跳去上一個資料夾第一首。",
        "<strong>上一首</strong>",
        "<strong>播放 / 暫停</strong>",
        "<strong>下一首</strong>",
        "<strong>下一個資料夾</strong> — 跳去下一個資料夾第一首。",
        "<strong>隨機播放</strong>",
        "<strong>停止</strong>",
      ]},
      { p: "撳播放器就可以喺清單中搵到而家播緊嗰首。" },
    ]},
    { heading: "5. 重新排序同編輯", blocks: [
      { p: "拖動歌曲喺資料夾內或者跨資料夾重新排。每首歌都可以改名、移動或者移除，原始次序會保留以便還原。" },
    ]},
    { heading: "6. 儲存同載入播放清單", blocks: [
      { p: "<strong>儲存播放清單</strong> 會將成個資料庫（資料夾同所有歌曲資料）匯出做 JSON 檔，方便備份或分享。" },
      { p: "<strong>載入播放清單</strong> 會完整還原，包括標題同封面。舊檔欠咗嘅欄位會自動再向 SUNO 攞返。" },
    ]},
    { heading: "7. 封面", blocks: [
      { p: "每首歌都會喺播放清單同播放欄顯示 SUNO 封面，電腦同手機都係。舊嘅快取項目會喺頁面載入時自動補返。" },
    ]},
    { heading: "8. 外觀同語言", blocks: [
      { ul: [
        "<strong>主題切換</strong> — 淺色或深色模式。",
        "<strong>語言選擇</strong> — 多語言介面，支援 RTL。",
        "<strong>配色方案選擇器</strong> — 喺六款調色板度揀（Emerald、Ocean、Sunset、Lavender、Noir Gold、Rose），為深色同淺色模式下嘅界面着色。你嘅選擇會儲存喺瀏覽器同播放清單匯出檔案度。",
      ]},
    ]},
    { heading: "9. 手機 Web App", blocks: [
      { p: "App 完全響應式。喺任何手機瀏覽器都可以加歌、整資料夾、播放、隨機、儲存同載入播放清單 — 同電腦版功能一樣。" },
    ]},
    { heading: "10. 關於同免責聲明", blocks: [
      { p: "SUNO 播放清單播放器係一個獨立 Web App，用嚟整理個人 SUNO 連結。佢唔會寄存音檔，播放直接由 SUNO 串流。所有商標歸各自擁有者所有。" },
    ]},
  ],
};

const ja: ManualContent = {
  back: "← プレイヤーに戻る",
  title: "SUNO プレイリストプレイヤー — ユーザーマニュアル",
  subtitle: "デスクトップとモバイルのすべての機能を網羅したガイド。",
  version: "v1.0",
  sections: [
    { heading: "1. 概要", blocks: [
      { p: "SUNO プレイリストプレイヤーは、<strong>suno.com</strong> 上の楽曲を集めて整理し、再生できるアプリです。SUNO のリンクを貼るとタイトル、ジャケット、音源を取得し、フォルダーで分類されたプレイリストを作れます。" },
    ]},
    { heading: "2. 曲を追加する", blocks: [
      { p: "<strong>自動読み込みモード：</strong> SUNO の URL を1つ以上（1行に1つ）貼り付けます。各曲のメタデータが自動取得され、現在のフォルダーに追加されます。" },
      { p: "<strong>手動モード：</strong> SUNO の URL とカスタムタイトルを入力します。SUNO の既定名を上書きしたいときに便利です。" },
      { p: "どちらのモードもデスクトップとモバイルで同じ動作です。" },
    ]},
    { heading: "3. フォルダー", blocks: [
      { ul: [
        "<strong>フォルダー作成</strong> — 関連する曲をまとめる。",
        "<strong>名前変更 / 削除</strong> はいつでも可能。",
        "再生中の曲を含むフォルダーは<strong>自動的に開きます</strong>。",
        "プレイヤーをタップするとその曲のフォルダーへジャンプし、他は折りたたまれます。",
        "再読み込み後、すべてのフォルダーは<strong>折りたたまれた</strong>状態で開きます。",
      ]},
    ]},
    { heading: "4. プレイヤー", blocks: [
      { p: "プレイヤーバーにはジャケットとタイトルが表示されます。コントロール：" },
      { ul: [
        "<strong>前のフォルダー</strong> — 前のフォルダーの先頭曲へ。",
        "<strong>前の曲</strong>",
        "<strong>再生 / 一時停止</strong>",
        "<strong>次の曲</strong>",
        "<strong>次のフォルダー</strong> — 次のフォルダーの先頭曲へ。",
        "<strong>シャッフル</strong>",
        "<strong>停止</strong>",
      ]},
      { p: "プレイヤーをタップするとプレイリスト内の曲を見つけられます。" },
    ]},
    { heading: "5. 並べ替えと編集", blocks: [
      { p: "曲をドラッグしてフォルダー内または間で並べ替えできます。各曲は名前変更、移動、削除が可能で、元の順序は保持されます。" },
    ]},
    { heading: "6. プレイリストの保存と読み込み", blocks: [
      { p: "<strong>プレイリスト保存</strong> はライブラリ全体（フォルダーと曲の完全データ）を JSON ファイルとしてエクスポートします。" },
      { p: "<strong>プレイリスト読み込み</strong> はタイトルとジャケットを含めて完全に復元します。古いファイルの欠落項目は SUNO から再取得されます。" },
    ]},
    { heading: "7. ジャケット", blocks: [
      { p: "各曲はプレイリストとプレイヤーバーの両方に SUNO のジャケットを表示します（デスクトップ・モバイル共通）。古いキャッシュ項目はページ読込時に自動補完されます。" },
    ]},
    { heading: "8. 外観と言語", blocks: [
      { ul: [
        "<strong>テーマ切替</strong> — ライト/ダーク。",
        "<strong>言語セレクター</strong> — 多言語UI、RTL対応。",
        "<strong>カラースキーム選択</strong> — 6つのパレット（Emerald、Ocean、Sunset、Lavender、Noir Gold、Rose）から選んで、ダーク/ライト両モードのインターフェースに色付けします。選択はブラウザとプレイリストのエクスポートに保存されます。",
      ]},
    ]},
    { heading: "9. モバイル Web アプリ", blocks: [
      { p: "アプリは完全レスポンシブ。スマホのブラウザから曲追加、フォルダー作成、再生、シャッフル、保存・読み込みすべて可能で、デスクトップと同じ機能です。" },
    ]},
    { heading: "10. 概要と免責事項", blocks: [
      { p: "SUNO プレイリストプレイヤーは個人の SUNO リンクを整理する独立した Web アプリです。音声はホストせず、SUNO から直接ストリーミングされます。すべての商標は各所有者に帰属します。" },
    ]},
  ],
};

const ko: ManualContent = {
  back: "← 플레이어로 돌아가기",
  title: "SUNO 플레이리스트 플레이어 — 사용자 매뉴얼",
  subtitle: "데스크톱과 모바일의 모든 기능을 다룬 완전한 가이드.",
  version: "v1.0",
  sections: [
    { heading: "1. 개요", blocks: [
      { p: "SUNO 플레이리스트 플레이어는 <strong>suno.com</strong>의 곡을 수집·정리·재생할 수 있게 해줍니다. SUNO 링크를 붙여 넣으면 제목, 커버, 오디오를 가져와 폴더로 그룹화된 플레이리스트를 만들 수 있습니다." },
    ]},
    { heading: "2. 곡 추가", blocks: [
      { p: "<strong>자동 로드 모드:</strong> 하나 이상의 SUNO URL을 (한 줄에 하나씩) 붙여 넣으면 메타데이터가 자동으로 가져와져 현재 폴더에 추가됩니다." },
      { p: "<strong>수동 모드:</strong> SUNO URL과 사용자 지정 제목을 입력합니다. SUNO 기본 이름을 덮어쓸 때 유용합니다." },
      { p: "두 모드 모두 데스크톱과 모바일에서 동일하게 작동합니다." },
    ]},
    { heading: "3. 폴더", blocks: [
      { ul: [
        "<strong>폴더 만들기</strong> — 관련 곡을 묶기.",
        "<strong>이름 변경 / 삭제</strong> 언제든지 가능.",
        "재생 중인 곡의 폴더는 <strong>자동으로 열립니다</strong>.",
        "플레이어를 탭하면 해당 곡의 폴더로 이동하고 다른 폴더는 접힙니다.",
        "새로 고침 시 모든 폴더는 <strong>접힌</strong> 상태로 시작합니다.",
      ]},
    ]},
    { heading: "4. 플레이어", blocks: [
      { p: "플레이어 바에 커버와 제목이 표시됩니다. 컨트롤:" },
      { ul: [
        "<strong>이전 폴더</strong> — 이전 폴더의 첫 곡으로 이동.",
        "<strong>이전 곡</strong>",
        "<strong>재생 / 일시정지</strong>",
        "<strong>다음 곡</strong>",
        "<strong>다음 폴더</strong> — 다음 폴더의 첫 곡으로 이동.",
        "<strong>셔플</strong>",
        "<strong>정지</strong>",
      ]},
      { p: "플레이어를 탭하면 플레이리스트에서 현재 곡을 찾을 수 있습니다." },
    ]},
    { heading: "5. 정렬 및 편집", blocks: [
      { p: "곡을 드래그하여 폴더 내 또는 폴더 간에 재정렬할 수 있습니다. 각 곡은 이름 변경, 이동, 제거가 가능하며 원래 순서는 보존됩니다." },
    ]},
    { heading: "6. 플레이리스트 저장 및 불러오기", blocks: [
      { p: "<strong>플레이리스트 저장</strong>은 전체 라이브러리(폴더와 곡 전체 데이터)를 JSON 파일로 내보냅니다." },
      { p: "<strong>플레이리스트 불러오기</strong>는 제목과 커버를 포함해 그대로 복원합니다. 이전 파일의 누락 항목은 SUNO에서 자동으로 다시 가져옵니다." },
    ]},
    { heading: "7. 커버", blocks: [
      { p: "각 곡은 플레이리스트와 플레이어 바 모두에 SUNO 커버를 표시합니다(데스크톱·모바일 공통). 오래된 캐시 항목은 페이지 로드 시 자동으로 채워집니다." },
    ]},
    { heading: "8. 모양 및 언어", blocks: [
      { ul: [
        "<strong>테마 전환</strong> — 라이트/다크 모드.",
        "<strong>언어 선택기</strong> — 다국어 UI, RTL 지원.",
        "<strong>컬러 스킴 선택기</strong> — 6가지 팔레트(Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) 중 선택하여 다크/라이트 모드 모두에 색상을 입힙니다. 선택은 브라우저와 플레이리스트 내보내기에 저장됩니다.",
      ]},
    ]},
    { heading: "9. 모바일 웹 앱", blocks: [
      { p: "앱은 완전한 반응형입니다. 어떤 모바일 브라우저에서도 곡 추가, 폴더 생성, 재생, 셔플, 저장 및 불러오기를 데스크톱과 동일하게 사용할 수 있습니다." },
    ]},
    { heading: "10. 정보 및 면책조항", blocks: [
      { p: "SUNO 플레이리스트 플레이어는 개인 SUNO 링크 정리를 위한 독립 웹 앱입니다. 오디오를 호스팅하지 않으며 재생은 SUNO에서 직접 스트리밍됩니다. 모든 상표는 각 소유자에게 있습니다." },
    ]},
  ],
};

const hi: ManualContent = {
  back: "← प्लेयर पर वापस",
  title: "SUNO प्लेलिस्ट प्लेयर — उपयोगकर्ता मैनुअल",
  subtitle: "डेस्कटॉप और मोबाइल पर सभी सुविधाओं की पूरी गाइड।",
  version: "v1.0",
  sections: [
    { heading: "1. परिचय", blocks: [
      { p: "SUNO प्लेलिस्ट प्लेयर आपको <strong>suno.com</strong> पर मौजूद गाने इकट्ठा करने, व्यवस्थित करने और चलाने देता है। SUNO लिंक पेस्ट करें और ऐप शीर्षक, कवर और ऑडियो ले आएगा ताकि आप फ़ोल्डरों में बंटी प्लेलिस्ट बना सकें।" },
    ]},
    { heading: "2. गाने जोड़ना", blocks: [
      { p: "<strong>ऑटो-लोड मोड:</strong> एक या अधिक SUNO URL (प्रति पंक्ति एक) पेस्ट करें। ऐप स्वचालित रूप से प्रत्येक ट्रैक का मेटाडेटा लाकर वर्तमान फ़ोल्डर में जोड़ता है।" },
      { p: "<strong>मैनुअल मोड:</strong> SUNO URL और अपना शीर्षक दें। SUNO के डिफ़ॉल्ट नाम को बदलने के लिए उपयोगी।" },
      { p: "दोनों मोड डेस्कटॉप और मोबाइल पर समान रूप से काम करते हैं।" },
    ]},
    { heading: "3. फ़ोल्डर", blocks: [
      { ul: [
        "<strong>फ़ोल्डर बनाएँ</strong> — संबंधित गानों को समूहीकृत करें।",
        "<strong>नाम बदलें / हटाएँ</strong> कभी भी।",
        "जो गाना चल रहा है उसका फ़ोल्डर <strong>स्वतः खुलता है</strong>।",
        "प्लेयर पर टैप करने से उस गाने के फ़ोल्डर पर जाते हैं और बाकी संकुचित हो जाते हैं।",
        "रीलोड पर सभी फ़ोल्डर <strong>बंद</strong> रहते हैं।",
      ]},
    ]},
    { heading: "4. प्लेयर", blocks: [
      { p: "प्लेयर बार वर्तमान गाने की कवर और शीर्षक दिखाता है। नियंत्रण:" },
      { ul: [
        "<strong>पिछला फ़ोल्डर</strong> — पिछले फ़ोल्डर के पहले गाने पर जाएँ।",
        "<strong>पिछला गाना</strong>",
        "<strong>चलाएँ / रोकें</strong>",
        "<strong>अगला गाना</strong>",
        "<strong>अगला फ़ोल्डर</strong> — अगले फ़ोल्डर के पहले गाने पर जाएँ।",
        "<strong>शफ़ल</strong>",
        "<strong>रोकें</strong>",
      ]},
      { p: "प्लेयर पर टैप करके प्लेलिस्ट में गाने को ढूँढें।" },
    ]},
    { heading: "5. पुनः क्रम और संपादन", blocks: [
      { p: "गानों को खींचकर फ़ोल्डर के अंदर या बीच में पुनर्व्यवस्थित करें। प्रत्येक गाने का नाम बदला, स्थानांतरित या हटाया जा सकता है। मूल क्रम सुरक्षित रहता है।" },
    ]},
    { heading: "6. प्लेलिस्ट सहेजें और लोड करें", blocks: [
      { p: "<strong>प्लेलिस्ट सहेजें</strong> पूरी लाइब्रेरी — फ़ोल्डर <em>और</em> गानों का पूरा डेटा — को JSON फ़ाइल के रूप में निर्यात करता है।" },
      { p: "<strong>प्लेलिस्ट लोड करें</strong> शीर्षक और कवर सहित ठीक वैसे ही पुनर्स्थापित करता है। पुरानी फ़ाइलों में गुम फ़ील्ड SUNO से स्वचालित रूप से पुनः प्राप्त किए जाते हैं।" },
    ]},
    { heading: "7. कवर आर्ट", blocks: [
      { p: "हर गाना अपनी SUNO कवर को प्लेलिस्ट और प्लेयर बार दोनों में दिखाता है (डेस्कटॉप और मोबाइल)। पुराने कैश की प्रविष्टियाँ पेज लोड पर स्वचालित रूप से भरी जाती हैं।" },
    ]},
    { heading: "8. रूप और भाषा", blocks: [
      { ul: [
        "<strong>थीम टॉगल</strong> — हल्की/गहरी मोड।",
        "<strong>भाषा चयनकर्ता</strong> — बहुभाषी UI, RTL समर्थन।",
        "<strong>कलर स्कीम चयनकर्ता</strong> — छह पैलेट (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) में से चुनें जो डार्क और लाइट दोनों मोड में इंटरफ़ेस को रंगते हैं। आपकी पसंद ब्राउज़र और प्लेलिस्ट निर्यात में सेव होती है।",
      ]},
    ]},
    { heading: "9. मोबाइल वेब ऐप", blocks: [
      { p: "ऐप पूरी तरह उत्तरदायी है। किसी भी मोबाइल ब्राउज़र से गाने जोड़ें, फ़ोल्डर बनाएँ, चलाएँ, शफ़ल करें, सहेजें और लोड करें — डेस्कटॉप जैसी ही सुविधाएँ।" },
    ]},
    { heading: "10. परिचय और अस्वीकरण", blocks: [
      { p: "SUNO प्लेलिस्ट प्लेयर व्यक्तिगत SUNO लिंक व्यवस्थित करने के लिए एक स्वतंत्र वेब ऐप है। यह ऑडियो होस्ट नहीं करता; प्लेबैक SUNO से सीधे स्ट्रीम होता है। सभी ट्रेडमार्क उनके संबंधित स्वामियों के हैं।" },
    ]},
  ],
};

const ar: ManualContent = {
  back: "← العودة إلى المشغل",
  title: "مشغّل قوائم SUNO — دليل المستخدم",
  subtitle: "دليل كامل لجميع الميزات على الحاسوب والهاتف.",
  version: "v1.0",
  sections: [
    { heading: "1. نظرة عامة", blocks: [
      { p: "يتيح لك مشغّل قوائم SUNO جمع وتنظيم وتشغيل المقاطع المستضافة على <strong>suno.com</strong>. الصق رابط SUNO وسيقوم التطبيق بجلب العنوان والغلاف والصوت لتُنشئ قوائم تشغيل مجمّعة في مجلدات." },
    ]},
    { heading: "2. إضافة الأغاني", blocks: [
      { p: "<strong>وضع التحميل التلقائي:</strong> الصق رابطاً واحداً أو أكثر من SUNO (رابط لكل سطر). يجلب التطبيق بيانات كل مقطع تلقائياً ويضيفه إلى المجلد الحالي." },
      { p: "<strong>الوضع اليدوي:</strong> الصق رابط SUNO وأدخل عنواناً مخصصاً. مفيد لاستبدال الاسم الافتراضي." },
      { p: "كلا الوضعين يعملان بنفس الطريقة على الحاسوب والهاتف." },
    ]},
    { heading: "3. المجلدات", blocks: [
      { ul: [
        "<strong>إنشاء مجلد</strong> — لتجميع الأغاني المرتبطة.",
        "<strong>إعادة تسمية / حذف</strong> المجلدات في أي وقت.",
        "المجلد الذي يحتوي الأغنية الحالية <strong>يُفتح تلقائياً</strong>.",
        "النقر على المشغّل ينقلك إلى مجلد تلك الأغنية ويطوي الباقي.",
        "عند إعادة التحميل تبدأ كل المجلدات <strong>مطوية</strong>.",
      ]},
    ]},
    { heading: "4. المشغّل", blocks: [
      { p: "يعرض شريط المشغّل الغلاف والعنوان. عناصر التحكم:" },
      { ul: [
        "<strong>المجلد السابق</strong> — الانتقال لأول أغنية في المجلد السابق.",
        "<strong>الأغنية السابقة</strong>",
        "<strong>تشغيل / إيقاف مؤقت</strong>",
        "<strong>الأغنية التالية</strong>",
        "<strong>المجلد التالي</strong> — الانتقال لأول أغنية في المجلد التالي.",
        "<strong>عشوائي</strong>",
        "<strong>إيقاف</strong>",
      ]},
      { p: "انقر على المشغّل لتحديد موقع الأغنية في القائمة." },
    ]},
    { heading: "5. إعادة الترتيب والتحرير", blocks: [
      { p: "اسحب الأغاني لإعادة ترتيبها داخل المجلدات أو بينها. يمكن إعادة تسمية كل أغنية أو نقلها أو حذفها مع الحفاظ على الترتيب الأصلي." },
    ]},
    { heading: "6. حفظ وتحميل القوائم", blocks: [
      { p: "<strong>حفظ القائمة</strong> يصدّر مكتبتك بالكامل (المجلدات وبيانات الأغاني) كملف JSON للنسخ الاحتياطي أو المشاركة." },
      { p: "<strong>تحميل القائمة</strong> يستعيدها كما هي مع العناوين والأغلفة. الحقول الناقصة في الملفات القديمة تُجلب تلقائياً من SUNO." },
    ]},
    { heading: "7. الأغلفة", blocks: [
      { p: "تظهر صورة غلاف SUNO لكل أغنية في القائمة وفي شريط المشغّل، على الحاسوب والهاتف. تُستكمل الإدخالات القديمة المخزّنة تلقائياً عند تحميل الصفحة." },
    ]},
    { heading: "8. المظهر واللغة", blocks: [
      { ul: [
        "<strong>تبديل النمط</strong> — فاتح/داكن.",
        "<strong>منتقي اللغة</strong> — واجهة متعددة اللغات بدعم RTL.",
        "<strong>منتقي مخطط الألوان</strong> — اختر من بين ستة لوحات (Emerald، Ocean، Sunset، Lavender، Noir Gold، Rose) لصبغ الواجهة في الوضعين الداكن والفاتح. يتم حفظ اختيارك في المتصفح وفي صادر قوائم التشغيل.",
      ]},
    ]},
    { heading: "9. تطبيق الويب على الجوال", blocks: [
      { p: "التطبيق متجاوب بالكامل. يمكنك إضافة الأغاني وإنشاء المجلدات والتشغيل والخلط والحفظ والتحميل من أي متصفح جوال — بنفس ميزات الحاسوب." },
    ]},
    { heading: "10. حول وإخلاء المسؤولية", blocks: [
      { p: "مشغّل قوائم SUNO تطبيق ويب مستقل لتنظيم روابط SUNO الشخصية. لا يستضيف الصوت؛ يتم البث مباشرة من SUNO. جميع العلامات التجارية لأصحابها." },
    ]},
  ],
};

const ms: ManualContent = {
  back: "← Kembali ke Pemain",
  title: "Pemain Senarai SUNO — Manual Pengguna",
  subtitle: "Panduan lengkap semua ciri di desktop dan mudah alih.",
  version: "v1.0",
  sections: [
    { heading: "1. Gambaran Keseluruhan", blocks: [
      { p: "Pemain Senarai SUNO membolehkan anda mengumpul, menyusun dan memainkan lagu di <strong>suno.com</strong>. Tampal pautan SUNO dan apl akan mengambil tajuk, gambar kulit dan audio supaya anda boleh membina senarai dalam folder." },
    ]},
    { heading: "2. Menambah Lagu", blocks: [
      { p: "<strong>Mod muat-auto:</strong> Tampal satu atau lebih URL SUNO (satu setiap baris). Apl mengambil metadata setiap lagu dan menambahkannya ke folder semasa." },
      { p: "<strong>Mod manual:</strong> Tampal URL SUNO dan beri tajuk tersuai untuk menggantikan nama lalai SUNO." },
      { p: "Kedua-dua mod berfungsi sama di desktop dan mudah alih." },
    ]},
    { heading: "3. Folder", blocks: [
      { ul: [
        "<strong>Cipta folder</strong> — kumpulkan lagu berkaitan.",
        "<strong>Namakan semula / padam</strong> bila-bila masa.",
        "Folder lagu yang dimainkan akan <strong>terbuka secara automatik</strong>.",
        "Ketuk pemain untuk melompat ke folder lagu itu; folder lain akan ditutup.",
        "Selepas muat semula, semua folder akan <strong>tertutup</strong>.",
      ]},
    ]},
    { heading: "4. Pemain", blocks: [
      { p: "Bar pemain menunjukkan kulit dan tajuk lagu. Kawalan:" },
      { ul: [
        "<strong>Folder sebelum</strong> — lagu pertama folder sebelumnya.",
        "<strong>Lagu sebelum</strong>",
        "<strong>Main / Jeda</strong>",
        "<strong>Lagu seterusnya</strong>",
        "<strong>Folder seterusnya</strong> — lagu pertama folder seterusnya.",
        "<strong>Rawak</strong>",
        "<strong>Henti</strong>",
      ]},
      { p: "Ketuk pemain untuk mencari lagu semasa dalam senarai." },
    ]},
    { heading: "5. Susun Semula & Edit", blocks: [
      { p: "Seret lagu untuk menyusun semula dalam atau antara folder. Setiap lagu boleh dinamakan semula, dipindah atau dialih keluar. Susunan asal disimpan untuk dipulihkan." },
    ]},
    { heading: "6. Simpan & Muat Senarai", blocks: [
      { p: "<strong>Simpan Senarai</strong> mengeksport seluruh perpustakaan (folder dan data penuh lagu) sebagai fail JSON untuk sandaran atau kongsian." },
      { p: "<strong>Muat Senarai</strong> memulihkan semuanya termasuk tajuk dan kulit. Medan yang hilang dalam fail lama diambil semula daripada SUNO." },
    ]},
    { heading: "7. Gambar Kulit", blocks: [
      { p: "Setiap lagu memaparkan kulit SUNO dalam senarai dan bar pemain, di desktop dan mudah alih. Catatan lama dalam cache diisi secara automatik semasa halaman dimuat." },
    ]},
    { heading: "8. Penampilan & Bahasa", blocks: [
      { ul: [
        "<strong>Togol tema</strong> — mod cerah/gelap.",
        "<strong>Pemilih bahasa</strong> — UI berbilang bahasa, sokongan RTL.",
        "<strong>Pemilih skema warna</strong> — pilih daripada enam palet (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) yang mewarnai antara muka dalam mod gelap dan cerah. Pilihan anda disimpan dalam pelayar dan eksport senarai main.",
      ]},
    ]},
    { heading: "9. Apl Web Mudah Alih", blocks: [
      { p: "Apl ini sepenuhnya responsif. Tambah lagu, cipta folder, mainkan, rawak, simpan dan muat senarai dari mana-mana pelayar telefon — sama seperti desktop." },
    ]},
    { heading: "10. Mengenai & Penafian", blocks: [
      { p: "Pemain Senarai SUNO ialah apl web bebas untuk mengurus pautan SUNO peribadi. Ia tidak menghos audio; main balik dialirkan terus dari SUNO. Semua tanda dagangan adalah milik pemiliknya." },
    ]},
  ],
};

const id: ManualContent = {
  back: "← Kembali ke Pemutar",
  title: "Pemutar Daftar SUNO — Panduan Pengguna",
  subtitle: "Panduan lengkap semua fitur di desktop dan ponsel.",
  version: "v1.0",
  sections: [
    { heading: "1. Ringkasan", blocks: [
      { p: "Pemutar Daftar SUNO memungkinkan Anda mengumpulkan, mengatur, dan memainkan lagu yang di-host di <strong>suno.com</strong>. Tempel tautan SUNO, dan aplikasi akan mengambil judul, sampul, dan audio sehingga Anda dapat membuat daftar putar yang dikelompokkan dalam folder." },
    ]},
    { heading: "2. Menambah Lagu", blocks: [
      { p: "<strong>Mode muat-otomatis:</strong> Tempel satu atau lebih URL SUNO (satu per baris). Aplikasi otomatis mengambil metadata setiap trek dan menambahkannya ke folder saat ini." },
      { p: "<strong>Mode manual:</strong> Tempel URL SUNO dan masukkan judul kustom untuk mengganti nama bawaan SUNO." },
      { p: "Kedua mode bekerja sama di desktop dan ponsel." },
    ]},
    { heading: "3. Folder", blocks: [
      { ul: [
        "<strong>Buat folder</strong> — kelompokkan lagu terkait.",
        "<strong>Ubah nama / hapus</strong> kapan saja.",
        "Folder lagu yang sedang diputar <strong>terbuka otomatis</strong>.",
        "Ketuk pemutar untuk melompat ke folder lagu tersebut; lainnya akan diciutkan.",
        "Saat dimuat ulang, semua folder dimulai dalam keadaan <strong>diciutkan</strong>.",
      ]},
    ]},
    { heading: "4. Pemutar", blocks: [
      { p: "Bilah pemutar menampilkan sampul dan judul. Kontrol:" },
      { ul: [
        "<strong>Folder sebelumnya</strong> — lagu pertama folder sebelumnya.",
        "<strong>Lagu sebelumnya</strong>",
        "<strong>Putar / Jeda</strong>",
        "<strong>Lagu berikutnya</strong>",
        "<strong>Folder berikutnya</strong> — lagu pertama folder berikutnya.",
        "<strong>Acak</strong>",
        "<strong>Hentikan</strong>",
      ]},
      { p: "Ketuk pemutar untuk menemukan lagu di daftar putar." },
    ]},
    { heading: "5. Atur Ulang & Edit", blocks: [
      { p: "Seret lagu untuk mengatur ulang di dalam atau antar folder. Setiap lagu dapat diubah namanya, dipindahkan, atau dihapus. Urutan asli tetap tersimpan." },
    ]},
    { heading: "6. Simpan & Muat Daftar Putar", blocks: [
      { p: "<strong>Simpan Daftar</strong> mengekspor seluruh pustaka (folder dan data lagu lengkap) sebagai berkas JSON untuk cadangan atau berbagi." },
      { p: "<strong>Muat Daftar</strong> memulihkan semuanya termasuk judul dan sampul. Bidang yang hilang pada berkas lama diambil ulang dari SUNO." },
    ]},
    { heading: "7. Sampul", blocks: [
      { p: "Setiap lagu menampilkan sampul SUNO di daftar putar dan bilah pemutar, di desktop maupun ponsel. Entri lama di cache diisi otomatis saat halaman dimuat." },
    ]},
    { heading: "8. Tampilan & Bahasa", blocks: [
      { ul: [
        "<strong>Pengalih tema</strong> — mode terang/gelap.",
        "<strong>Pemilih bahasa</strong> — UI multibahasa dengan dukungan RTL.",
        "<strong>Pemilih skema warna</strong> — pilih dari enam palet (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) yang mewarnai antarmuka dalam mode gelap dan terang. Pilihan Anda disimpan di browser dan ekspor daftar putar.",
      ]},
    ]},
    { heading: "9. Aplikasi Web Mobile", blocks: [
      { p: "Aplikasi sepenuhnya responsif. Tambahkan lagu, buat folder, putar, acak, simpan, dan muat daftar dari peramban ponsel mana pun — fitur sama dengan desktop." },
    ]},
    { heading: "10. Tentang & Sanggahan", blocks: [
      { p: "Pemutar Daftar SUNO adalah aplikasi web independen untuk mengatur tautan SUNO pribadi. Tidak meng-host audio; pemutaran dialirkan langsung dari SUNO. Semua merek dagang milik pemiliknya masing-masing." },
    ]},
  ],
};

const vi: ManualContent = {
  back: "← Quay lại trình phát",
  title: "Trình phát danh sách SUNO — Hướng dẫn sử dụng",
  subtitle: "Hướng dẫn đầy đủ mọi tính năng trên máy tính và di động.",
  version: "v1.0",
  sections: [
    { heading: "1. Tổng quan", blocks: [
      { p: "Trình phát danh sách SUNO cho phép bạn thu thập, sắp xếp và phát các bản nhạc trên <strong>suno.com</strong>. Dán liên kết SUNO và ứng dụng sẽ lấy tiêu đề, ảnh bìa và âm thanh để bạn xây dựng danh sách phát theo thư mục." },
    ]},
    { heading: "2. Thêm bài hát", blocks: [
      { p: "<strong>Chế độ tự tải:</strong> Dán một hoặc nhiều URL SUNO (mỗi dòng một). Ứng dụng tự động lấy dữ liệu của từng bài và thêm vào thư mục hiện tại." },
      { p: "<strong>Chế độ thủ công:</strong> Dán URL SUNO và nhập tiêu đề tùy chỉnh, hữu ích khi muốn thay tên mặc định của SUNO." },
      { p: "Cả hai chế độ hoạt động giống nhau trên máy tính và di động." },
    ]},
    { heading: "3. Thư mục", blocks: [
      { ul: [
        "<strong>Tạo thư mục</strong> — gom các bài liên quan.",
        "<strong>Đổi tên / xóa</strong> bất kỳ lúc nào.",
        "Thư mục chứa bài đang phát sẽ <strong>tự mở</strong>.",
        "Chạm vào trình phát sẽ nhảy đến thư mục bài đó và thu gọn các thư mục khác.",
        "Khi tải lại, mọi thư mục đều <strong>thu gọn</strong>.",
      ]},
    ]},
    { heading: "4. Trình phát", blocks: [
      { p: "Thanh phát hiển thị ảnh bìa và tiêu đề. Điều khiển:" },
      { ul: [
        "<strong>Thư mục trước</strong> — đến bài đầu của thư mục trước.",
        "<strong>Bài trước</strong>",
        "<strong>Phát / Tạm dừng</strong>",
        "<strong>Bài kế tiếp</strong>",
        "<strong>Thư mục kế tiếp</strong> — đến bài đầu của thư mục kế tiếp.",
        "<strong>Phát ngẫu nhiên</strong>",
        "<strong>Dừng</strong>",
      ]},
      { p: "Chạm vào trình phát để định vị bài trong danh sách." },
    ]},
    { heading: "5. Sắp xếp & chỉnh sửa", blocks: [
      { p: "Kéo bài để sắp xếp lại trong hoặc giữa các thư mục. Mỗi bài có thể đổi tên, di chuyển hoặc xóa. Thứ tự gốc được giữ để khôi phục." },
    ]},
    { heading: "6. Lưu & tải danh sách", blocks: [
      { p: "<strong>Lưu danh sách</strong> xuất toàn bộ thư viện (thư mục và dữ liệu đầy đủ của bài) ra tệp JSON để sao lưu hoặc chia sẻ." },
      { p: "<strong>Tải danh sách</strong> khôi phục y nguyên kèm tiêu đề và ảnh bìa. Trường thiếu trong tệp cũ được lấy lại từ SUNO." },
    ]},
    { heading: "7. Ảnh bìa", blocks: [
      { p: "Mỗi bài hiển thị ảnh bìa SUNO trong danh sách và thanh phát, trên máy tính và di động. Mục cũ trong bộ nhớ đệm được tự bổ sung khi tải trang." },
    ]},
    { heading: "8. Giao diện & ngôn ngữ", blocks: [
      { ul: [
        "<strong>Chuyển chủ đề</strong> — sáng/tối.",
        "<strong>Chọn ngôn ngữ</strong> — UI đa ngôn ngữ, hỗ trợ RTL.",
        "<strong>Bộ chọn bảng màu</strong> — chọn từ sáu bảng màu (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) để tô màu giao diện ở cả chế độ tối và sáng. Lựa chọn của bạn được lưu trong trình duyệt và xuất danh sách phát.",
      ]},
    ]},
    { heading: "9. Ứng dụng web di động", blocks: [
      { p: "Ứng dụng đáp ứng đầy đủ. Bạn có thể thêm bài, tạo thư mục, phát, ngẫu nhiên, lưu và tải danh sách từ trình duyệt di động — cùng tính năng như máy tính." },
    ]},
    { heading: "10. Giới thiệu & miễn trừ", blocks: [
      { p: "Trình phát danh sách SUNO là ứng dụng web độc lập để sắp xếp các liên kết SUNO cá nhân. Nó không lưu trữ âm thanh; việc phát được phát trực tiếp từ SUNO. Mọi nhãn hiệu thuộc về chủ sở hữu tương ứng." },
    ]},
  ],
};

const th: ManualContent = {
  back: "← กลับไปที่เครื่องเล่น",
  title: "ตัวเล่นเพลย์ลิสต์ SUNO — คู่มือผู้ใช้",
  subtitle: "คู่มือฟีเจอร์ทั้งหมดสำหรับเดสก์ท็อปและมือถือ",
  version: "v1.0",
  sections: [
    { heading: "1. ภาพรวม", blocks: [
      { p: "ตัวเล่นเพลย์ลิสต์ SUNO ให้คุณรวบรวม จัดระเบียบ และเล่นเพลงจาก <strong>suno.com</strong> วางลิงก์ SUNO แล้วแอปจะดึงชื่อเพลง ปกอัลบั้ม และเสียงให้คุณสร้างเพลย์ลิสต์ที่จัดกลุ่มเป็นโฟลเดอร์" },
    ]},
    { heading: "2. การเพิ่มเพลง", blocks: [
      { p: "<strong>โหมดโหลดอัตโนมัติ:</strong> วาง URL SUNO หนึ่งรายการขึ้นไป (บรรทัดละหนึ่ง) แอปจะดึงข้อมูลแต่ละเพลงและเพิ่มลงในโฟลเดอร์ปัจจุบันโดยอัตโนมัติ" },
      { p: "<strong>โหมดด้วยตนเอง:</strong> วาง URL SUNO พร้อมตั้งชื่อเอง เหมาะสำหรับการแทนที่ชื่อเริ่มต้นของ SUNO" },
      { p: "ทั้งสองโหมดทำงานเหมือนกันบนเดสก์ท็อปและมือถือ" },
    ]},
    { heading: "3. โฟลเดอร์", blocks: [
      { ul: [
        "<strong>สร้างโฟลเดอร์</strong> — รวมเพลงที่เกี่ยวข้อง",
        "<strong>เปลี่ยนชื่อ / ลบ</strong> ได้ทุกเมื่อ",
        "โฟลเดอร์ของเพลงที่กำลังเล่นจะ<strong>เปิดอัตโนมัติ</strong>",
        "แตะที่ตัวเล่นเพื่อกระโดดไปโฟลเดอร์ของเพลงนั้น และยุบโฟลเดอร์อื่น",
        "เมื่อรีโหลด โฟลเดอร์ทั้งหมดจะ<strong>ยุบ</strong>",
      ]},
    ]},
    { heading: "4. ตัวเล่น", blocks: [
      { p: "แถบตัวเล่นแสดงปกและชื่อเพลง ตัวควบคุม:" },
      { ul: [
        "<strong>โฟลเดอร์ก่อนหน้า</strong> — ไปที่เพลงแรกของโฟลเดอร์ก่อนหน้า",
        "<strong>เพลงก่อนหน้า</strong>",
        "<strong>เล่น / หยุดชั่วคราว</strong>",
        "<strong>เพลงถัดไป</strong>",
        "<strong>โฟลเดอร์ถัดไป</strong> — ไปที่เพลงแรกของโฟลเดอร์ถัดไป",
        "<strong>สุ่ม</strong>",
        "<strong>หยุด</strong>",
      ]},
      { p: "แตะตัวเล่นเพื่อค้นหาเพลงในรายการ" },
    ]},
    { heading: "5. การจัดเรียงและแก้ไข", blocks: [
      { p: "ลากเพลงเพื่อจัดเรียงในหรือระหว่างโฟลเดอร์ แต่ละเพลงเปลี่ยนชื่อ ย้าย หรือลบได้ ลำดับเดิมจะถูกเก็บไว้เพื่อย้อนกลับ" },
    ]},
    { heading: "6. บันทึกและโหลดเพลย์ลิสต์", blocks: [
      { p: "<strong>บันทึกเพลย์ลิสต์</strong> ส่งออกไลบรารีทั้งหมด (โฟลเดอร์และข้อมูลเพลงครบถ้วน) เป็นไฟล์ JSON เพื่อสำรองหรือแชร์" },
      { p: "<strong>โหลดเพลย์ลิสต์</strong> กู้คืนตามเดิม รวมชื่อและปก ฟิลด์ที่ขาดในไฟล์เก่าจะถูกดึงจาก SUNO อีกครั้งโดยอัตโนมัติ" },
    ]},
    { heading: "7. ปกเพลง", blocks: [
      { p: "ทุกเพลงจะแสดงปก SUNO ทั้งในเพลย์ลิสต์และแถบตัวเล่น ทั้งบนเดสก์ท็อปและมือถือ รายการแคชเก่าจะถูกเติมเต็มอัตโนมัติเมื่อโหลดหน้า" },
    ]},
    { heading: "8. รูปลักษณ์และภาษา", blocks: [
      { ul: [
        "<strong>สลับธีม</strong> — โหมดสว่าง/มืด",
        "<strong>เลือกภาษา</strong> — UI หลายภาษา รองรับ RTL",
        "<strong>ตัวเลือกธีมสี</strong> — เลือกจากหกพาเลต (Emerald, Ocean, Sunset, Lavender, Noir Gold, Rose) เพื่อระบายสีอินเตอร์เฟซในโหมดมืดและสว่าง การเลือกจะถูกบันทึกในเบราว์เซอร์และการส่งออกเพลย์ลิสต์",
      ]},
    ]},
    { heading: "9. เว็บแอปบนมือถือ", blocks: [
      { p: "แอปรองรับทุกขนาดหน้าจอ เพิ่มเพลง สร้างโฟลเดอร์ เล่น สุ่ม บันทึก และโหลดเพลย์ลิสต์จากเบราว์เซอร์มือถือใดก็ได้ — มีฟีเจอร์เหมือนเดสก์ท็อป" },
    ]},
    { heading: "10. เกี่ยวกับและข้อปฏิเสธความรับผิด", blocks: [
      { p: "ตัวเล่นเพลย์ลิสต์ SUNO เป็นเว็บแอปอิสระสำหรับจัดระเบียบลิงก์ SUNO ส่วนตัว ไม่ได้โฮสต์เสียง การเล่นสตรีมจาก SUNO โดยตรง เครื่องหมายการค้าทั้งหมดเป็นของเจ้าของเครื่องหมายนั้น" },
    ]},
  ],
};

const MANUAL: Record<LangCode, ManualContent> = {
  en, es, pt, it, de, fr, zh, yue, ja, ko, hi, ar, ms, id, vi, th,
};

export function getManual(lang: LangCode): ManualContent {
  return MANUAL[lang] ?? en;
}

export type ManualUI = {
  openManual: string;
  search: string;
  downloadPdf: string;
  noResults: string;
};

const MANUAL_UI: Record<LangCode, ManualUI> = {
  en:  { openManual: "📖 Open User Manual",        search: "Search the manual…",      downloadPdf: "⬇ Download PDF",        noResults: "No matching sections." },
  es:  { openManual: "📖 Abrir manual de usuario",  search: "Buscar en el manual…",    downloadPdf: "⬇ Descargar PDF",       noResults: "Sin coincidencias." },
  pt:  { openManual: "📖 Abrir manual do utilizador", search: "Pesquisar no manual…",  downloadPdf: "⬇ Baixar PDF",          noResults: "Sem resultados." },
  it:  { openManual: "📖 Apri il manuale utente",   search: "Cerca nel manuale…",      downloadPdf: "⬇ Scarica PDF",         noResults: "Nessun risultato." },
  de:  { openManual: "📖 Benutzerhandbuch öffnen",  search: "Im Handbuch suchen…",     downloadPdf: "⬇ PDF herunterladen",   noResults: "Keine passenden Abschnitte." },
  fr:  { openManual: "📖 Ouvrir le manuel",         search: "Rechercher dans le manuel…", downloadPdf: "⬇ Télécharger en PDF", noResults: "Aucun résultat." },
  zh:  { openManual: "📖 打开用户手册",              search: "在手册中搜索…",            downloadPdf: "⬇ 下载 PDF",             noResults: "没有匹配的章节。" },
  yue: { openManual: "📖 打開用戶手冊",              search: "喺手冊度搵…",              downloadPdf: "⬇ 下載 PDF",             noResults: "冇符合嘅章節。" },
  ja:  { openManual: "📖 ユーザーマニュアルを開く",   search: "マニュアル内を検索…",       downloadPdf: "⬇ PDFをダウンロード",     noResults: "該当するセクションがありません。" },
  ko:  { openManual: "📖 사용자 매뉴얼 열기",         search: "매뉴얼 검색…",             downloadPdf: "⬇ PDF 다운로드",         noResults: "일치하는 섹션이 없습니다." },
  hi:  { openManual: "📖 उपयोगकर्ता मैनुअल खोलें",     search: "मैनुअल में खोजें…",          downloadPdf: "⬇ PDF डाउनलोड करें",     noResults: "कोई मेल नहीं मिला।" },
  ar:  { openManual: "📖 فتح دليل المستخدم",         search: "ابحث في الدليل…",          downloadPdf: "⬇ تنزيل PDF",            noResults: "لا توجد نتائج مطابقة." },
  ms:  { openManual: "📖 Buka Manual Pengguna",     search: "Cari dalam manual…",       downloadPdf: "⬇ Muat turun PDF",       noResults: "Tiada hasil yang sepadan." },
  id:  { openManual: "📖 Buka Manual Pengguna",     search: "Cari di manual…",          downloadPdf: "⬇ Unduh PDF",            noResults: "Tidak ada hasil." },
  vi:  { openManual: "📖 Mở hướng dẫn sử dụng",     search: "Tìm trong hướng dẫn…",     downloadPdf: "⬇ Tải PDF",              noResults: "Không tìm thấy mục phù hợp." },
  th:  { openManual: "📖 เปิดคู่มือผู้ใช้",            search: "ค้นหาในคู่มือ…",            downloadPdf: "⬇ ดาวน์โหลด PDF",        noResults: "ไม่พบส่วนที่ตรงกัน" },
};

export function getManualUI(lang: LangCode): ManualUI {
  return MANUAL_UI[lang] ?? MANUAL_UI.en;
}
