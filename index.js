/* empty css                      */import{S as v,a as g,i as c}from"./assets/vendor-ZSDeOiWA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function l(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=l(r);fetch(r.href,a)}})();const M=({largeImageURL:t,webformatURL:e,tags:l,likes:o,views:r,comments:a,downloads:n})=>`
    <div class="gallery-wrapper">
      <a class="gallery-link" href="${t}">
        <img class="gallery-image" src="${e}" alt="${l}">
        <ul class="gallery-info-list">
          <li class="gallery-info-item">
            <p class="gallery-info-title">Likes</p>
            <p class="gallery-info-value">${o}</p>
          </li>
          <li class="gallery-info-item">
            <p class="gallery-info-title">Views</p>
            <p class="gallery-info-value">${r}</p>
          </li>
          <li class="gallery-info-item">
            <p class="gallery-info-title">Comments</p>
            <p class="gallery-info-value">${a}</p>
          </li>
          <li class="gallery-info-item">
            <p class="gallery-info-title">Downloads</p>
            <p class="gallery-info-value">${n}</p>
          </li>
        </ul>
      </a>
    </div>
  `,y=t=>t.map(e=>M(e)).join(""),p=new v(".gallery a",{captions:!0,captionDelay:250,captionsData:"alt"});document.querySelector(".gallery");document.querySelector(".loader");document.querySelector(".btn-load-more");g.defaults.baseURL="https://pixabay.com/api/";const f=async(t,e)=>{try{const l={q:t,page:e,key:"50407836-8adbdb7013dbe19a53a013547",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15},o=await g.get("",{params:l});return{images:o.data.hits,total:o.data.totalHits}}catch(l){return console.log(l.message),{images:[],total:0}}},s={searchForm:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".btn-load-more")},m=15;let u,i,d,h;function b(){s.loader.classList.remove("hidden")}function L(){s.loader.classList.add("hidden")}const S=async t=>{if(t.preventDefault(),i=1,s.gallery.innerHTML="",s.btnLoadMore.classList.remove("is-visible"),d=t.currentTarget.elements.search_text.value.trim(),d===""){c.error({title:"Error",message:"Input cannot be empty!",position:"topRight"}),s.btnLoadMore.classList.remove("is-visible"),t.currentTarget.elements.search_text.value="";return}b();try{const{images:e,total:l}=await f(d,i);if(e.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),s.searchForm.reset(),s.btnLoadMore.classList.remove("is-visible");return}s.gallery.innerHTML=y(e),p.refresh(),i+=1,e.length<m?s.btnLoadMore.classList.remove("is-visible"):s.btnLoadMore.classList.add("is-visible");const o=document.querySelector(".gallery-wrapper");o&&(h=o.getBoundingClientRect().height)}catch(e){c.error({title:"Error",message:e.message})}finally{L()}},w=async()=>{b();try{const{images:t,total:e}=await f(d,i);if(s.gallery.insertAdjacentHTML("beforeend",y(t)),p.refresh(),window.scrollBy({top:h*2,left:0,behavior:"smooth"}),u=Math.ceil(e/m),i===u||t.length<m){c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),s.btnLoadMore.classList.remove("is-visible");return}i+=1,s.btnLoadMore.classList.add("is-visible")}catch(t){c.error({message:t.message,position:"topRight"}),console.log(t.message)}finally{L()}};s.searchForm.addEventListener("submit",S);s.btnLoadMore.addEventListener("click",w);
//# sourceMappingURL=index.js.map
