import{a as P,S,i as n}from"./assets/vendor-DQvd0HNi.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const F="54842065-4aabfdb1463b75fbfdf76b66f",q="https://pixabay.com/api/",g=15;async function f(s,e=1){return(await P.get(q,{params:{key:F,q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:g}})).data}const y=document.querySelector(".gallery"),p=document.querySelector(".loader"),u=document.querySelector(".js-load-more"),C=new S(".gallery a",{captionsData:"alt",captionDelay:250});function h(s){const e=s.map(({webformatURL:r,largeImageURL:i,tags:t,likes:o,views:c,comments:w,downloads:v})=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${i}">
                <img
                    class="gallery-image"
                    src="${r}"
                    alt="${t}"
                    />
                </a>
                <ul class="gallery-stat-list">
                    <li class="gallery-stat-item">
                        <p><b>Likes</b></p>
                        <p>${o}</p>
                    </li>
                    <li class="gallery-stat-item">
                        <p><b>Views</b></p>
                        <p>${c}</p>
                    </li>
                    <li class="gallery-stat-item">
                        <p><b>Comments</b></p>
                        <p>${w}</p>
                    </li>
                    <li class="gallery-stat-item">
                        <p><b>Downloads</b></p>
                        <p>${v}</p>
                    </li>
                </ul>
            </li>
            `).join("");y.insertAdjacentHTML("beforeend",e),C.refresh()}function M(){y.innerHTML=""}function b(){p.classList.add("loader")}function a(){p.classList.remove("loader")}function L(){u.classList.remove("visually-hidden")}function m(){u.classList.add("visually-hidden")}a();const $=document.querySelector(".form");let l=1,d="";$.addEventListener("submit",E);u.addEventListener("click",O);async function E(s){s.preventDefault();const e=s.target;if(d=e.elements["search-text"].value.trim(),!d.length)return n.warning({title:"Caution",message:"Please enter your query!",position:"topRight",timeout:7e3});l=1,M(),m(),b();try{const r=await f(d,l);if(r.hits.length>0){h(r.hits),a();const i=Math.ceil(r.totalHits/g);if(l>=i)return m(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomRight",messageColor:"#4e75ff",backgroundColor:"#F6FF00",timeout:7e3});L()}else return a(),n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"center",messageColor:"#F6FF00",backgroundColor:"#4e75ff",timeout:7e3})}catch(r){n.error({message:"Something went wrong! Please try new query!",position:"center",timeout:7e3}),console.error("Error 2!!!",r)}finally{a(),e.reset()}}async function O(s){l++,m(),b(),u.disabled=!0;try{const e=await f(d,l);h(e.hits),a(),x();const r=Math.ceil(e.totalHits/g);if(l>=r)return m(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomRight",messageColor:"#4e75ff",backgroundColor:"#F6FF00",timeout:7e3});L(),u.disabled=!1}catch(e){a(),n.error({message:"Something went wrong while loading more images!",position:"center",timeout:7e3}),console.error("Error 1!!!",e)}finally{a()}}function x(){const s=document.querySelector(".gallery-stat-item");if(s){const e=s.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
