// @ts-nocheck
import {trackComponent, trackComponentRegistered} from "../_global";
import {cardHTML,setupCard} from "../../modules/card.module";

trackComponentRegistered("iam-video-card");

class iamVideoCard extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({ mode: 'open'});

    const assetLocation = document.body.hasAttribute('data-assets-location') ? document.body.getAttribute('data-assets-location') : '/assets';
    const loadCSS = `@import "${assetLocation}/css/components/video-card.component.css";`;
    
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    ${loadCSS}
    </style>
    ${cardHTML}
    <dialog>
      <div class="embed"></div>
    </dialog>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

	async connectedCallback() {

    const cardComponent = this;
    const cardHead =  cardComponent.shadowRoot.querySelector('.card__head');

    const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const link_id = randLetter + Date.now();

    let dialog;
    let embed;

    setupCard(cardComponent);

    // Check if youtube or vimeo video link is present
    if(cardComponent.querySelector('[data-youtube]'))
      cardComponent.setAttribute('data-youtube',cardComponent.querySelector('[data-youtube]').getAttribute('data-youtube'));

    if(cardComponent.querySelector('[data-vimeo]'))
      cardComponent.setAttribute('data-vimeo',cardComponent.querySelector('[data-vimeo]').getAttribute('data-vimeo'));

    // General dialog stuff
    if(cardComponent.hasAttribute('data-youtube') || cardComponent.hasAttribute('data-vimeo')){

      cardHead.setAttribute('tabindex','0');

      // Add dialog to page
      if(!document.getElementById(`${link_id}-dialog`)){
        document.body.insertAdjacentHTML('beforeend', `<dialog id="${link_id}-dialog"><div class="embed" id="${link_id}"></div></dialog>`);
      }

      dialog = document.getElementById(`${link_id}-dialog`);
      embed = document.getElementById(link_id);
    }

    // Youtube
    if(cardComponent.hasAttribute('data-youtube')){

      // Load the scripts only once
      if(!document.body.classList.contains('youtubeLoaded')){
        let loaded = await this.loadScripts();
      }
      cardHead.addEventListener('click',function(){

        const customEvent = new CustomEvent("play-video", { detail: { 'Video Type': 'YoutTube', 'ID': cardComponent.getAttribute('data-youtube') } });
        cardComponent.dispatchEvent(customEvent);

        cardComponent.createVideo(embed);
        dialog.showModal();
      });

      dialog.addEventListener("close", (event) => {
        
        if(typeof window.player != "undefined" && typeof window.player.pauseVideo == "function")
          window.player.pauseVideo();

        
        const customEvent = new CustomEvent("close-video", { detail: { 'Video Type': 'YoutTube', 'ID': cardComponent.getAttribute('data-youtube') } });
        cardComponent.dispatchEvent(customEvent);
      });

    }
    else if(cardComponent.hasAttribute('data-vimeo')){ // Vimeo

      cardHead.addEventListener('click',function(){

        const videoId = cardComponent.getAttribute('data-vimeo');

        const customEvent = new CustomEvent("play-video", { detail: { 'Video Type': 'Vimeo', 'ID': videoId } });
        cardComponent.dispatchEvent(customEvent);

        if(!embed.querySelector('iframe'))
          embed.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoId}?autoplay=1" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`

        dialog.showModal();
      });

      dialog.addEventListener("close", (event) => {
        
        embed.innerHTML = ``; // Remove the video since we cant pause it

        const customEvent = new CustomEvent("close-video", { detail: { 'Video Type': 'Vimeo', 'ID': cardComponent.getAttribute('data-vimeo') } });
        cardComponent.dispatchEvent(customEvent);
      });
    }

    trackComponent(cardComponent,"iam-video-card",['play-video','close-video']);
  }

  loadScripts(){

    return new Promise((resolve, reject) => {

      const image = new Image();
      image.onload = function(){

        // This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        document.body.classList.add('youtubeLoaded');
        resolve(true);
      };
      image.onerror = function(){
        reject(false);
      };
      image.src = "https://youtube.com/favicon.ico";
    });

  }

  createVideo(target){

    if(typeof window.player != "undefined" && typeof window.player.pauseVideo == "function")
      window.player.playVideo();

    var link_id = target.getAttribute('id');
    var video_id = this.getAttribute('data-youtube');

    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    function onYouTubeIframeAPIReady() {

      window.player = new YT.Player(link_id, {
        height: '100%',
        width: '100%',
        videoId: video_id,
        playerVars: {
          'modestbranding': 1,
          'playsinline': 1,
          'rel': 0,
          'showinfo': 0
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
    onYouTubeIframeAPIReady();

    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      // Play the video straight away
      event.target.playVideo();
    }

    // The API calls this function when the player's state changes.
    // The function indicates that when playing a video (state=1)
    var done = false;
    function onPlayerStateChange(event) {

      if (event.data == YT.PlayerState.PLAYING && !done) {

        var link = document.getElementById(link_id);
        link.classList.add('player-ready');

        done = true;
      }
    }
  }

  static get observedAttributes() {
    return ["data-image"];
  }
  
  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case "data-image": {

        if(oldVal != newVal){

          const cardHeadImg = this.shadowRoot.querySelector('.card__head img');

          if(cardHeadImg)
            cardHeadImg.setAttribute('src',newVal);
        }
        break;
      }
    }

  }
}

export default iamVideoCard;