import { postData, getData, isExpiredTime, checkCookieExist } from "../services/services";
import { validateName, validateEmail, validatePhone } from "../services/validator";
import { showThanksModal } from "./modal";

function form(selectorForm, selectorName, selectorPhone) {

    const form = document.querySelector(selectorForm),    
          message = {
             loading: 'img/form/spinner.svg',
             success: 'Заявка отправлена',
             failure: 'Не получилось отправить заявку.'
          };

    validateName(selectorName);

    form.reset();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formDataObj = Object.fromEntries(new FormData(form).entries()),
        jsonForm = JSON.stringify(formDataObj);
        
        if (!validateEmail(formDataObj.email)) {
            showMessage('Некорректные данные');
            return ;
        }

        const loadingImg= document.createElement('img');
        loadingImg.src = message.loading;
        loadingImg.style.cssText = `
            display: block;
            margin: 0 auto;
        `; 
        form.insertAdjacentElement('afterend', loadingImg);

        const lifetime = 300,
              storageKey = formDataObj.name + formDataObj.email + formDataObj.phone;

        if(formDataObj.name === "" || formDataObj.phone === "") {
            showMessage('Некорректные данные');
            loadingImg.remove();
            return ;
        }
        
        getData('api/user/checkExist.php', formDataObj)
            .then(data => data.json())
            .then(data => {
                if (!data.isExist) {
                    localStorage.setItem(storageKey, +new Date());
                    //document.cookie = `${storageKey}=; max-age=${lifetime}`;
                    createUser(jsonForm);
                    
                } else if (isExpiredTime(storageKey, lifetime)){
                    localStorage.setItem(storageKey, +new Date());
                    //document.cookie = `${storageKey}=; max-age=${lifetime}`;
                    createUser(jsonForm);

                } else {
                    showMessage('Превышено количество запросов для данного пользователя');
                }
            })
            .catch(err => console.log(err))
            .finally(() => loadingImg.remove());
    });



    validatePhone(selectorPhone);

    function createUser(json) {
        postData('api/user/create.php', json)
            .then(data => data.json())
            .then(data => {
                showThanksModal('modal__dialog', '.modal', message.success);
            })
            .catch((e) => {
                console.log(e);
                showMessage(message.failure);
            })
            .finally(() => {
                form.reset();
            });
    }
   
    function showMessage(text) {
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
            color: red;
        `;
        statusMessage.textContent = text;
        document.querySelector(selectorName).insertAdjacentElement('beforebegin', statusMessage);
        
        setTimeout(() => {
            statusMessage.remove();
        }, 2000);
    }
}

export {form};