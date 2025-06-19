/** @odoo-module **/

console.log('[print_auto_pdf] JS file loaded');

function getActiveRecordId(btn) {
    console.log('[print_auto_pdf] Getting active record ID...');
    const el = document.querySelector('#o_hidden_order_id_wrapper span');
    const orderId = el ? el.textContent.trim() : null;
    console.log('Purchase Order ID:', orderId, el);
    return orderId;
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
                };
            } else {
                alert('Popup blocked. Please allow popups for this site.');
            }
        }, 100);
    }
}, true); 