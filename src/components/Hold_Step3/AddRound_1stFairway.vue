<template>
  <div v-show="open && $ScheduleStore.nowGameInfo.defState==1"
  class="overflow-y-auto h-[48vh]" style="z-index: 1000;">

  <!-- data -->
  <div  v-for="(row,rowID) in $ScheduleStore.temp_playersInSessions"  class="w-full  h-auto flex flex-col gap-[20px]  ">
  <div class="w-full h-[65px] flex gap-[10px] px-[10px] items-center" :class="{'h-[86px]':$ScheduleStore.nowGameInfo.roundID>200}">
    <!-- 開始時間 -->
    <div class="w-[120px] p-[10px] leading-[55px] flex-shrink-0">
      <div class="relative w-[110px] h-[33px]" id="timePicker_1st"  style="z-index: 2000;">
        <div class="w-[20px] h-[30px] bg-white_wb absolute top-[5px] left-[8px] "  style="z-index: 800;"></div>
        <!-- <VueDatePicker  v-model="row.sTime" time-picker   :teleport="true" select-text="確定" cancel-text="取消">
        </VueDatePicker> -->

        <!-- && row.sTime.length==5 -->
        <div v-if="row.sTime!='' "
        class="absolute bg-white h-[30px] left-[36px] top-0 leading-[32px] font-[600]  tracking-wide pointer-events-auto" style="z-index: 820;">
          {{ row.sTime }}
        </div>
        
         
           <div class="w-[20px] h-[30px] bg-white_wb absolute top-[3px] right-[4px] " style="z-index: 800;"><img src="../../../assets/images/admin/time.png" class="w-[23px] translate-y-[6px]"></div>
       
      </div>
    </div>

    <!-- 選手列 -->
    <button :disabled="$ScheduleStore.chosenPlayersArray.length==0 || $ScheduleStore.temp_playersInSessions.length==0 "

    v-for="(player,playerID) in row.rowPlayers" 
    class="w-full h-full rounded-[4px] p-[10px] border-[1px]  justify-start text-gray_m border-gray_m
    disabled:text-gray_l disabled:border-gray_l "
    :class="{'border-gray_lightest':player.gName, 'items-start':$ScheduleStore.nowGameInfo.roundID>200}"
    :style="{background: $ScheduleStore.temp_changePlayer_row ==rowID &&  $ScheduleStore.temp_changePlayer_sort ==playerID && $ScheduleStore.deleteMark[0] !=rowID && $ScheduleStore.deleteMark[1]!=playerID ? '#E2FAFF' :(player.gName ? '#efefef': '#FFF')
 , 
		borderColor:  $ScheduleStore.temp_changePlayer_row!==-1 ||$ScheduleStore.chosenPlayersArray.length>0 ? '#999999': (player.gName? '#efefef':'#DDD')}">


    <!-- 有內容 -->
    <div v-if="player.gName" @click ="changePlayer(rowID,playerID, player)" 
    class="flex flex-col items-start w-full cursor-pointer">
      <!-- {{player  }} -->
      <div class=" flex justify-between w-full">
        <p class="text-blue_d font-[600]">{{ player.gName }} </p>
        <button @click="$ScheduleStore.DELETE_PLAYER(rowID,playerID, player.playerID1)"  class=" w-[20px] h-[20px] ">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.465069 0.465069C0.186123 0.744015 0.186124 1.19628 0.465069 1.47522L2.99045 4.0006L0.465069 6.52598C0.186123 6.80493 0.186123 7.25719 0.465069 7.53614C0.744015 7.81508 1.19628 7.81508 1.47522 7.53614L4.0006 5.01076L6.52598 7.53614C6.80493 7.81508 7.25719 7.81508 7.53614 7.53614C7.81508 7.25719 7.81508 6.80493 7.53614 6.52598L5.01076 4.0006L7.53614 1.47522C7.81508 1.19628 7.81508 0.744015 7.53614 0.465069C7.25719 0.186123 6.80493 0.186123 6.52598 0.465069L4.0006 2.99045L1.47522 0.465069C1.19628 0.186123 0.744015 0.186123 0.465069 0.465069Z" fill="#222222"/></svg>
        </button>
      </div>
      	<p 
        class="text-black_m" v-if="$ScheduleStore.nowGameInfo.roundID<200">	&#40;{{ player.tName }}	&#41; {{ player.pName1 }}</p>

        <div v-else class="flex flex-col text-black_m" >
          <p v-if="$ScheduleStore.nowGameInfo.roundID<300 && $ScheduleStore.nowGameInfo.roundID >200">預賽第 {{ player.preRanking }} 名</p>
          <p v-else>複賽第 {{ player.preRanking }} 名</p>
          
          <!-- <p> {{ player.pName1 }}</p> -->
        </div>
					
    </div>

      <!-- 空的 -->
      <!-- && $ScheduleStore.temp_changePlayer_row ==-1 -->
      <button :disabled="$ScheduleStore.chosenPlayersArray.length<=0 && $ScheduleStore.temp_changePlayer_row ==-1"
      v-else   @click="toggle_chosenGrid(rowID,playerID)" 
      class="flex  justify-start items-start w-full ">
      <p class=" leading-[45px] text-[24px]  mr-[10px] "  :style="{color: $ScheduleStore.temp_changePlayer_row!==-1 || $ScheduleStore.chosenPlayersArray.length>0 ?'#999999':'#DDDDDD'}"  :class="{'leading-[60px]':$ScheduleStore.nowGameInfo.roundID>200}">+ </p>
      
      <p v-if="$ScheduleStore.chosenGrid[0]==rowID && $ScheduleStore.chosenGrid[1] ==playerID && $ScheduleStore.chosenPlayersArray.length>0  " class="leading-[45px]" :style="{color: $ScheduleStore.chosenPlayersArray.length>0 ?'#999999':'#DDDDDD'}"  :class="{'leading-[60px]':$ScheduleStore.nowGameInfo.roundID>200}"> 新增至此</p>

      <!-- changePosition() -->
      <p @click="$ScheduleStore.CHANGE_PLAYERS($ScheduleStore.temp_changePlayer_row,$ScheduleStore.temp_changePlayer_sort,temp_changePlayer)"
      v-if="$ScheduleStore.chosenGrid[0]==rowID && $ScheduleStore.chosenGrid[1] ==playerID && $ScheduleStore.temp_changePlayer_row !==-1 && $ScheduleStore.chosenPlayersArray.length==0" class="leading-[45px] w-full  text-start" :style="{color: $ScheduleStore.temp_changePlayer_row!==-1  ?'#999999':'#DDDDDD'}"  :class="{'leading-[60px]':$ScheduleStore.nowGameInfo.roundID>200}"> 換位至此 </p>
    </button>
    </button>

    <!-- 刪除列 -->
    <button 
     :disabled="$ScheduleStore.temp_playersInSessions.length==1" @click="$ScheduleStore.DELETE_ROW(rowID)" class="w-[50px] h-full flex-shrink-0">

        <svg v-if="$ScheduleStore.temp_playersInSessions.length !==1"
        width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.0789 8.71835H6.3211C6.14495 8.71835 5.99083 8.7844 5.85872 8.91651C5.72661 9.04862 5.66055 9.20275 5.66055 9.3789L6.49725 20.4982C6.51193 20.689 6.6 20.8468 6.76147 20.9716C6.92294 21.0963 7.14312 21.1587 7.42202 21.1587H16.978C17.2422 21.1587 17.455 21.0963 17.6165 20.9716C17.778 20.8468 17.8734 20.689 17.9028 20.4982L18.7394 9.3789C18.7394 9.20275 18.6734 9.04862 18.5413 8.91651C18.4092 8.7844 18.255 8.71835 18.0789 8.71835ZM8.76514 19.8376C8.61835 19.8376 8.48624 19.7716 8.36881 19.6395C8.25138 19.5073 8.19266 19.3532 8.19266 19.1771L7.62018 10.678C7.62018 10.5018 7.68624 10.3514 7.81835 10.2266C7.95046 10.1018 8.10459 10.0394 8.28073 10.0394C8.45688 10.0394 8.61101 10.1018 8.74312 10.2266C8.87523 10.3514 8.94128 10.5018 8.94128 10.678L9.33761 19.1771C9.33761 19.3532 9.28257 19.5073 9.17248 19.6395C9.06239 19.7716 8.92661 19.8376 8.76514 19.8376ZM12.7725 19.155C12.7725 19.3459 12.7174 19.5073 12.6073 19.6395C12.4972 19.7716 12.3615 19.8376 12.2 19.8376C12.0385 19.8376 11.9028 19.7716 11.7927 19.6395C11.6826 19.5073 11.6275 19.3459 11.6275 19.155L11.5394 10.678C11.5394 10.5018 11.6055 10.3514 11.7376 10.2266C11.8697 10.1018 12.0239 10.0394 12.2 10.0394C12.3761 10.0394 12.5303 10.1018 12.6624 10.2266C12.7945 10.3514 12.8606 10.5018 12.8606 10.678L12.7725 19.155ZM16.2073 19.1771C16.2073 19.3532 16.1486 19.5073 16.0312 19.6395C15.9138 19.7716 15.7817 19.8376 15.6349 19.8376C15.4734 19.8376 15.3376 19.7716 15.2275 19.6395C15.1174 19.5073 15.0624 19.3532 15.0624 19.1771L15.4587 10.678C15.4587 10.5018 15.5248 10.3514 15.6569 10.2266C15.789 10.1018 15.9431 10.0394 16.1193 10.0394C16.2954 10.0394 16.4495 10.1018 16.5817 10.2266C16.7138 10.3514 16.7798 10.5018 16.7798 10.678L16.2073 19.1771ZM18.4312 5.85596L14.4899 5.19541C14.3138 5.16606 14.2037 5.05596 14.1596 4.86514L13.9835 4.13853C13.9248 3.84495 13.822 3.65413 13.6752 3.56606C13.5872 3.52202 13.4257 3.5 13.1908 3.5H11.2092C10.9743 3.5 10.8055 3.52202 10.7028 3.56606C10.556 3.65413 10.4606 3.84495 10.4165 4.13853L10.2404 4.86514C10.211 5.05596 10.1009 5.16606 9.91009 5.19541L5.96881 5.85596C5.68991 5.9 5.45872 6.00642 5.27523 6.17523C5.09174 6.34404 5 6.55321 5 6.80275V7.41927C5 7.55138 5.04771 7.66147 5.14312 7.74954C5.23853 7.83761 5.35229 7.88165 5.4844 7.88165H18.9156C19.0477 7.88165 19.1615 7.83761 19.2569 7.74954C19.3523 7.66147 19.4 7.55138 19.4 7.41927V6.80275C19.4 6.55321 19.3083 6.34404 19.1248 6.17523C18.9413 6.00642 18.7101 5.9 18.4312 5.85596Z" fill="#666666"/></svg>

    </button>

  </div>

  <!-- 分隔線 -->
  <div class="w-full border-b-[1px] border-gray_l h-[1px] mb-[20px]"></div>


  </div>

  <div class="w-full">
        <button @click="$ScheduleStore.ADD_ROW" class="w-[137px] h-[40px] bg-white_wb border-[1px] border-solid border-black_m text-center text-black_m rounded-[50px]"> <span class="mr-[10px] text-[22px]"> + </span>   新增一列</button>
  </div>
</div>

</template>
<script setup>
 import {
	ref,
	onMounted,
	onUnmounted,
	reactive,
	computed,
	watch,
	nextTick,
  defineProps
} from "vue";
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'

import { useScheduleStore } from "../../src/stores/schedule";
const $ScheduleStore = useScheduleStore();

const emits = defineEmits()
const { open, chosenStartState } = defineProps(['open', 'chosenStartState']);

// 時間選單

const rowArray= ref([])

onMounted(() => {
  for(let index =0; index<1; index++) {
    rowArray.value.push({
      index:index,
      startTime: '',
    })
  }
  console.log(rowArray.value, 'rowArray.value')
})

// 顯示提示文字：新增至此
const toggle_chosenGrid =(rowID,playerID)=>{
  $ScheduleStore.chosenGrid = [rowID,playerID]
  console.log('起作用了~~~', $ScheduleStore.chosenGrid)
}


// 要換位置的選手
const temp_changePlayer =ref('')

const changePlayer =(rowID,playerID, player) =>{
temp_changePlayer.value = player
$ScheduleStore.temp_changePlayer_row = rowID
$ScheduleStore.temp_changePlayer_sort = playerID

$ScheduleStore.chosenPlayersArray =[]
// $ScheduleStore.CHANGE_PLAYERS(rowID,playerID, player)
}

watch(chosenStartState,(newVal)=>{
  if(newVal==1){
    $ScheduleStore.temp_playersInSessions = new Array(1).fill(null).map(() => ({
        sTime:'',
        rowPlayers: Array.from({ length: 5 }, () => ({}))
      }));
  }
})






</script>
<style >
#timePicker_1st .dp__main .dp__input {
  height: 40px;
  font-size: 17px;
  transform: translateY(-3px);
  border-color: #999;
  color: #222222;
  font-weight: 600;
  letter-spacing: 1px;
}

 .dp__action_buttons .dp__action_select {
  background-color: #008D6E !important;
  height: 30px;
  width: 60px;
  border-radius: 50px;
}
 .dp__action_cancel{
  border: 1px solid #999999;
  height: 30px;
  width: 60px;
  border-radius: 50px;
  transform: translateX(-10px);
}
#timePicker_1st .dp__main .dp__input_wrap .dp__input_icon_pad{
/* padding-inline-start: 10px !important; */
z-index: 900;
transform: translateY(-10px);
}

/* dp__icon dp__input_icon dp__input_icons */
</style>