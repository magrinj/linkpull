import type { TranslationDictionary } from './types'

export const fr: TranslationDictionary = {
  'header.title': 'LinkPull',

  'notice.notLinkedin': 'Ouvrez LinkedIn pour utiliser LinkPull.',
  'notice.wrongPage':
    'Naviguez vers la page \u00AB\u00A0Activit\u00E9\u00A0\u00BB d\u2019un profil LinkedIn pour extraire ses posts.',
  'notice.navigateActivity': 'Aller \u00E0 la page Activit\u00E9',

  'tabs.posts': 'Posts',
  'tabs.profile': 'Profil',
  'tabs.comingSoon': 'Bient\u00F4t',

  'filters.period': 'P\u00E9riode',
  'filters.all': 'Tout',
  'filters.year': 'Ann\u00E9e',
  'filters.sixMonths': '6 mois',
  'filters.threeMonths': '3 mois',
  'filters.custom': 'Personnalis\u00E9',
  'filters.minImpressions': 'Impressions min.',
  'filters.minReactions': 'R\u00E9actions min.',
  'filters.minComments': 'Commentaires min.',
  'filters.minReposts': 'Reposts min.',
  'filters.impressionsPlaceholder': '0',
  'filters.periodHelp': 'Filtrer les posts par plage de dates',
  'filters.impressionsHelp': 'Afficher uniquement les posts avec au moins ce nombre de vues',
  'filters.reactionsHelp':
    'Afficher uniquement les posts avec au moins ce nombre de r\u00E9actions',
  'filters.commentsHelp': 'Afficher uniquement les posts avec au moins ce nombre de commentaires',
  'filters.repostsHelp': 'Afficher uniquement les posts avec au moins ce nombre de republications',
  'filters.engagement': 'Engagement minimum',
  'filters.engagementHelp': 'Filtrer les posts par seuil d\u2019engagement',
  'filters.from': 'Du',
  'filters.to': 'Au',

  'extract.start': 'Extraire les posts',
  'extract.stop': 'Arr\u00EAter l\u2019extraction',
  'extract.newExtraction': 'Nouvelle extraction',

  'progress.scrolling': 'Chargement des posts...',
  'progress.extracting': 'Extraction des donn\u00E9es...',
  'progress.postsLoaded': '{count} posts charg\u00E9s',
  'progress.postsExtracted': '{count} extraits',
  'progress.tip0': 'Scan du fil d\u2019actualit\u00E9...',
  'progress.tip1': 'D\u00E9couverte de nouveaux posts...',
  'progress.tip2': 'D\u00E9filement de la timeline...',
  'progress.tip3': 'Collecte des donn\u00E9es...',
  'progress.tip4': 'Encore un peu de patience...',

  'results.posts': 'Posts',
  'results.impressions': 'Impressions',
  'results.reactions': 'R\u00E9actions',
  'results.comments': 'Commentaires',
  'results.reposts': 'Reposts',
  'results.avgPerPost': 'Moy./post',
  'results.morePosts': '+{count} autres posts',
  'results.complete': 'Extraction termin\u00E9e',

  'export.csv': 'CSV',
  'export.json': 'JSON',
  'export.copy': 'Copier',
  'export.copied': 'Copi\u00E9\u00A0!',
  'export.options': 'Options d\u2019export',
  'export.jsonSingle': 'Fichier unique',
  'export.jsonPerPost': 'Un par post',
  'export.downloadImages': 'T\u00E9l\u00E9charger les images',
  'export.downloadImagesHelp': 'T\u00E9l\u00E9charger les images des posts dans l\u2019archive ZIP',
  'export.optionsHelp': 'Configurer le format JSON et l\u2019export des images',
  'export.downloading': 'T\u00E9l\u00E9chargement des images {current}/{total}...',

  'postCard.open': 'Ouvrir',

  'media.image': 'IMG',
  'media.video': 'VID',
  'media.article': 'ART',
  'media.poll': 'POLL',
  'media.document': 'DOC',

  'empty.noPosts': 'Aucun post trouv\u00E9',
  'empty.adjustFilters': 'Essayez d\u2019ajuster vos filtres.',

  'error.title': '\u00C9chec de l\u2019extraction',
  'error.retry': 'R\u00E9essayer',

  'support.title': 'Vous aimez LinkPull\u00A0?',
  'support.message':
    'LinkPull est gratuit et open source. Si l\u2019extension vous est utile, aidez-nous \u00E0 la maintenir et \u00E0 la faire conna\u00EEtre\u00A0!',
  'support.rate': 'Noter sur le Chrome Store',
  'support.coffee': 'Offrir un caf\u00E9',
  'support.dismiss': 'Plus tard',

  'footer.tagline': 'LinkPull v{version} \u00B7 Respect de la vie priv\u00E9e, aucun serveur',
  'footer.openSource': 'Open source',
  'footer.support': 'Buy me a coffee',
}
