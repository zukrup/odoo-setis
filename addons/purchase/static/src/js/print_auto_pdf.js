/** @odoo-module **/

console.log('[print_auto_pdf] JS file loaded');

function getActiveRecordId(btn) {
    console.log('[print_auto_pdf] Getting active record ID...');
    
    // Try to get from Odoo's action context
    try {
        const action = window.odoo && window.odoo.__DEBUG__ && window.odoo.__DEBUG__.services['web.ActionManager'];
        if (action && action.currentAction && action.currentAction.context) {
            const activeId = action.currentAction.context.active_id;
            if (activeId) {
                console.log('[print_auto_pdf] Found ID in action context:', activeId);
                return activeId;
            }
        }
    } catch (e) {
        console.log('[print_auto_pdf] Action context error:', e);
    }

    // Try to get from form view
    const form = document.querySelector('form.o_form_view');
    console.log('[print_auto_pdf] Form element:', form);
    
    if (form) {
        // Try data-id attribute
        if (form.dataset && form.dataset.id) {
            console.log('[print_auto_pdf] Found ID in form dataset:', form.dataset.id);
            return form.dataset.id;
        }
        
        // Try hidden input
        const input = form.querySelector("input[name='id']");
        if (input && input.value) {
            console.log('[print_auto_pdf] Found ID in hidden input:', input.value);
            return input.value;
        }

        // Try to get from form's data attributes
        const formData = form.getAttribute('data-oe-model') && form.getAttribute('data-oe-id');
        if (formData) {
            console.log('[print_auto_pdf] Found ID in form data attributes:', formData);
            return formData;
        }
    }
    
    // Try button attributes
    if (btn) {
        const rid = btn.getAttribute('data-res-id') || btn.getAttribute('data-id');
        if (rid) {
            console.log('[print_auto_pdf] Found ID in button attributes:', rid);
            return rid;
        }
    }
    
    // Try URL hash
    const hash = window.location.hash;
    const match = hash.match(/id=(\d+)/);
    if (match) {
        console.log('[print_auto_pdf] Found ID in URL hash:', match[1]);
        return match[1];
    }

    // Try to get from breadcrumb
    const breadcrumb = document.querySelector('.o_form_breadcrumb .o_form_uri');
    if (breadcrumb) {
        const breadcrumbMatch = breadcrumb.textContent.match(/\d+/);
        if (breadcrumbMatch) {
            console.log('[print_auto_pdf] Found ID in breadcrumb:', breadcrumbMatch[0]);
            return breadcrumbMatch[0];
        }
    }
    
    console.log('[print_auto_pdf] No ID found');
    return null;
}

window.addEventListener('click', function(e) {
    const btn = e.target.closest('.o_print_auto_pdf');
    if (btn) {
        console.log('[print_auto_pdf] Button clicked');
        e.preventDefault();
        
        setTimeout(() => {
            let recordId = getActiveRecordId(btn);
            console.log('[print_auto_pdf] Final recordId:', recordId);
            
            if (!recordId) {
                alert('No record selected. Please make sure you are viewing a purchase order.');
                return;
            }
            
            const pdfUrl = '/report/pdf/purchase.report_purchaseorder/' + recordId;
            console.log('[print_auto_pdf] Opening PDF URL:', pdfUrl);
            
            const printWindow = window.open(pdfUrl, '_blank');
            if (printWindow) {
                printWindow.onload = function() {
                    console.log('[print_auto_pdf] PDF window loaded');
                    printWindow.focus();
                    printWindow.print();
                };
            } else {
                alert('Popup blocked. Please allow popups for this site.');
            }
        }, 100);
    }
}, true); 