function validateEmail(email) {
    const EMAIL_REGEXP = 
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    
    if(email.match(EMAIL_REGEXP)) {
        return true;
    }

    return false;
}

function validateName(selector) {
    let name = document.querySelector(selector);
    
    name.addEventListener('keydown', function(e) {
        if( !e.key.match(/^[A-Za-z]+$/) ) return e.preventDefault();
    }); 
      
    name.addEventListener('input', function(e){
        name.value = name.value.replace(/[0-9]/g, "");
    });
}

function validatePhone(selector) {
    var eventCalllback = function (e) {
        var el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+7(___) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }

    const phone_input = document.querySelector(selector);
    for (let ev of ['input', 'blur', 'focus']) {
        phone_input.addEventListener(ev, eventCalllback);
    }
}

export {validateEmail, validateName, validatePhone};