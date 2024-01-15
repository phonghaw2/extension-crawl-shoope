window.onload =  function() {
  
    // Initialize elementDOM var
    const bodyWrapper           = document.querySelector('body');
    const ITEM_CONTAINER        = '.item-restaurant-row';
    const IMAGE_CONTAINER       = '.item-restaurant-img';
    const ITEM_NAME_CONTAINER   = '.item-restaurant-name';
    const ITEM_DESC_CONTAINER   = '.item-restaurant-desc';
    const PRICE_CONTAINER       = '.current-price';
    // Initialize environment var
    var domainServer;

    // Render Toast in bottom
    renderBtnOrder();
    renderModal();
    getStorage();

    $('#order-button').click(function (e) {
        setTimeout(function () {
            let data = getDataItem();
            sendData(data);
        }, 500);
    });

    function getDataItem() {
        if (!checkElementExist()) {
            _log('No element with the name ' + ITEM_CONTAINER +' was found.');
            return [];
        }

        let rows = document.querySelectorAll(ITEM_CONTAINER);
        let data = [];

        rows.forEach(row => {
            data.push({
                img   : $(IMAGE_CONTAINER, row).find('img').attr('src'),
                name  : $(ITEM_NAME_CONTAINER, row)[0].innerText,
                desc  : $(ITEM_DESC_CONTAINER, row)[0].innerText,
                price : $(PRICE_CONTAINER, row)[0].innerText
            })
        });

        return data;
    }

    function sendData(data) {
        if (!data.length) {
            _log('The data set is empty.')
            return false;
        }

        let og_obj = {
            desc  : $('[property="og:description"]').attr('content'),
            title : $('[property="og:title"]').attr('content'),
            image : $('[property="og:image"]').attr('content'),
        }
        let shop_obj = {
            name    : $('.name-restaurant')[0].innerText,
            address : $('.address-restaurant')[0].innerText,
        }
        $.ajax({
            type: "POST",
            url: domainServer + '/api/food/insert',
            data: { 
                data  : data,
                path  : window.location.pathname,
                og    : og_obj,
                shop  : shop_obj
            },
            dataType: 'json',
            success: function (response) {
                setZoom();
                openModal();
                $('#link-order-food')[0].innerText = response.data.url
            },
            error: function (response) {
                setZoom();
                alert(response.responseJSON.message);
            }
        });
    }

    function renderBtnOrder() {
        let toastInnerHTML = `
            <div id="order-button">
                <img src="https://cdn-icons-png.flaticon.com/512/1037/1037762.png" class="order-image"> 
            </div>
        `;
        const toast = document.createElement('div');
        toast.id = "fixed-toast-div";
        toast.innerHTML = toastInnerHTML;
        bodyWrapper.appendChild(toast);
    }

    function renderModal() {
        let ModalInnerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h2>Order-food</h2>
                <button type="button" class="btn btn-secondary js-modal-close">Close</button>
            </div>
            <div class="modal-body">
                <a id="link-order-food">linkkneee.com</a>
                <button id="copy-btn">
                    <img src="https://www.svgrepo.com/show/3110/copy.svg" width="18px" height="18px">
                    Copy
                </button>
            </div>
        </div>
        `;
        const modal = document.createElement('div');
        modal.id = "modal-order";
        modal.innerHTML = ModalInnerHTML;
        bodyWrapper.appendChild(modal);
    }

    function openModal() {
        $('#modal-order').addClass('open');
    }

    function setZoom() {
        document.body.style.zoom = "350%";
    }

    function getStorage() {
        chrome.storage.sync.get(['domainServer'], (result) => {
            if (result.domainServer) domainServer = result.domainServer;
        })
    }

    function checkElementExist() {
        if ($(ITEM_CONTAINER)[0] && $(IMAGE_CONTAINER)[0] && $(ITEM_DESC_CONTAINER)[0]
            && $(PRICE_CONTAINER)[0] && $(ITEM_NAME_CONTAINER)[0]) {
            return true;
        }
        return false;
    }

    function _log(msg) {
        console.log(msg);
    }
    
    $('.js-modal-close').click(function (e) {
        $('#modal-order').removeClass('open');
    });

    $("#modal-order").click(function(){
        const self = event.target.closest('.modal-container');
        if (!self) {
            $("#modal-order").removeClass("open")
        }
    });

    $('#copy-btn').click(function() {
        var textToCopy = $('#link-order-food').text();
        var tempTextarea = $('<textarea>');
        $('body').append(tempTextarea);
        tempTextarea.val(textToCopy).select();
        document.execCommand('copy');
        tempTextarea.remove();
    });
}