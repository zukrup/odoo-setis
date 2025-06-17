# -*- coding: utf-8 -*-
{
    'name': 'Purchase Print Auto PDF JS',
    'description': 'Auto print PDF for purchase orders',
    'depends': ['purchase'],
    'assets': {
        'web.assets_backend': [
            'purchase/static/src/js/print_auto_pdf.js',
        ],
    },
} 