<template>
  <div  v-if="open"
  class="popup-wrap   bg-black/20"   style="z-index: 800;">
  <div
  class="w-[85%] h-[90%] bg-white_wb rounded-[20px] p-[43px]
  fixed top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%]" style="z-index: 500;">
  <!-- 標題列 -->
  <div class="flex justify-between h-[30px] mb-[25px] ">
    <p class="text-[20px] leading-[30px] ">賽程表</p>
    <button @click="close()"><img src="../../../assets/images/admin/close.png" alt="" class="w-[24px] h-[24px]"></button>
  </div>

  <!-- 地點日期列 -->
  <div class="w-full h-[44px] flex justify-between text-black_m text-[16px]  mb-[25px]">
    <div class="w-full flex gap-[10px]  mb-[30px] items-center relative">
      <!-- 場地 -->
      <!-- v-model="chosenFid" -->
      <select disabled
										class="bg-white w-[260px] h-[44px] mr-[20px] border-[1px] border-solid border-[#999] rounded-[4px] text-start   font-medium text-[16px] pr-[50px] pl-3 disabled:bg-white
                    hover:outline-none hover:border-black_m hover:ring-0
                    focus:outline-none focus:border-black_m focus:ring-0"
										>
											<option	v-for="(option, index) in  fidOption"
						          :key="option"			:value="option"
						          style="padding-bottom: 20px; font-weight: 200;"	>
						              {{ option.fName }}
					            </option>
				</select>
        <p class=" pointer-events-none absolute top-[-5px] left-[12px] bg-white">{{ chosenFid.fName }}</p>

      <!-- 日期列 -->
      <div class="w-full flex justify-start   gap-[10px] items-center ">
      <!-- 日期選項 -->
             <button    
              class=" h-[36px] px-[12px] py-[6px] rounded-[50px] text-center leading-[36px] text-black_m bg-green_l flex gap-[10px]
              disabled:bg-gray_m disabled:text-gray_l ">
              <p>{{ chosenDate.showDate }}</p>
            </button>
      </div>

    </div>
    

  <!-- 匯出競賽規程 -->
    <button @click=""
                class="w-[171px] h-[40px] ml-[20px]   rounded-[50px] text-black_m border-[1px] border-solid border-black_m text-[16px] ">匯出競賽規程
  </button>
  </div>

  <!-- data -->
  <!-- h-[calc(100%-180px)] -->
  <div class="w-full h-[calc(100%-130px)]  overflow-y-auto flex flex-col gap-[10px] "  >
    <div class="" v-for="(game, gameID) in gameSchedule">
    <p class="text-[16px] mb-[10px] mt-[30px]">{{ game.seName }}</p>

      <!-- 表頭 -->
    <div   class="w-full bg-white h-[41px] px-[10px] flex  text-gray_d text-[14px] font-semibold mb-[20px] rounded-[4px] shadow-lg">
      <div class="w-[120px] p-[10px] text-start flex-shrink-0">
        開始時間
      </div>
      <div class="w-[50px] p-[10px] text-start flex-shrink-0">
        道次
      </div>
     <div class="w-full p-[10px] text-start ">
        選手 1
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 2
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 3
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 4
      </div>
      <div class="w-full p-[10px] text-start ">
        選手 5
      </div>
      
    </div>

    <!-- data -->
    <div class="shadow-lg ">
    <div class="" v-for="(row,rowID) in game.sessionsDetails">
      <div class="w-full  flex  items-center text-gray_d text-[14px] font-semibold  rounded-[4px] "  :class="{'bg-[#efefef]':rowID%2!=0}">

        <!-- 開始時間 -->
        <div class="w-[120px] px-[20px] h-full text-start flex-shrink-0" >
        {{ row.sTime.slice(0, 5) }}
      </div>

          <!-- 道次 -->
      <div class="w-[50px] h-[66px]  text-start flex-shrink-0  leading-[66px] pl-[20px]"
     >
        {{ rowID+1 }}
      </div>

      <!-- 選手陣列 -->
      <div class="w-full h-full flex  " >
        <div v-for="(player, playerID) in row.rowPlayers
" class="flex w-full h-full pl-[10px] " >
        

     
      <div v-if="player.gName"  class="flex flex-col w-full p-[10px]">
        <p class="text-blue_d">{{ player.gName }}</p>
        <p>({{ player.tName }}) {{ player.pName1 }}</p>
      </div>

      </div>
      </div>
     


      </div>
   </div>
   </div>
 
    </div>


  

 

   </div>
  


  </div>
  </div>
</template>
<script setup>
 import {
	ref,	onMounted,	onUnmounted,	reactive,	computed,	watch,  defineProps} from "vue";

import { useScheduleStore } from "../../src/stores/schedule";
const $store = useScheduleStore();

const originData=ref([])

const emits = defineEmits()
const { open, fidOption, fiveCompetitions, fiveCompetitions_sessions , chosenDate, gameSchedule, chosenFid } = defineProps(['open', 'fidOption', 'fiveCompetitions', 'fiveCompetitions_sessions' , 'chosenDate', 'gameSchedule', 'chosenFid']);

// 選擇的地點


// 關掉 popup
const close=()=>{
  emits('close')
}


</script>
<style scoped>
::-webkit-scrollbar {
-webkit-appearance: none;
width: 4px; 
height: 0.4em;
}


::-webkit-scrollbar-track {
background: rgba(0, 0, 0, 0.2); 
/* background: #000; */
border-radius: 0;

}


::-webkit-scrollbar-thumb {
cursor: pointer; 
border-radius: 5px;
/* background: rgba(0, 0, 0, 0.15);  */
background: #666;
transition: color 0.2s ease;
 border-radius: 4px;
 -webkit-border-radius:2em;
 -mox-border-radius:2em;

      /* border: 1px solid slategrey; */

}

</style>