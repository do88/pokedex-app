<template>
   <div class="container">
      <div class="main-screen">
         <h1 class="main-screen__title">POKEDEX INDEX</h1>
         <ul class="main-screen__list">
            <li class="main-screen__list-item">
               <span class="main-screen__list-item-prefix">No</span>
               001:Bulbasaur
            </li>
            <li class="main-screen__list-item">
               <span class="main-screen__list-item-prefix">No</span>
               001:Bulbasaur
            </li>
            <li class="main-screen__list-item">
               <span class="main-screen__list-item-prefix">No</span>
               001:Bulbasaur
            </li>
            <li class="main-screen__list-item">
               <span class="main-screen__list-item-prefix">No</span>
               001:Bulbasaur
            </li>
         </ul>
      </div>
      <div class="sidebar">
         <div class="sub-screen">
            <p>
               Welcome user to the pokedex index. Use the arrows keys below or your mouse to interact with the selection
               screen and find our more information about your selected pokemon.
            </p>
         </div>
         <ul class="status-bar">
            <li class="status-bar__item status-bar__item--working">
               <div class="status-bar__light status-bar__light--green"></div>
               <div class="status-bar__title"></div>
            </li>
            <li class="status-bar__item status-bar__item--error">
               <div class="status-bar__light status-bar__light--red"></div>
               <div class="status-bar__title"></div>
            </li>
         </ul>
         <div class="controls">
            <button class="controls__up controls--blue"></button>
            <button class="controls__down controls--blue"></button>
            <button class="controls__enter controls--green"></button>
            <button class="controls__return controls--grey"></button>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "Home"
};
</script>
