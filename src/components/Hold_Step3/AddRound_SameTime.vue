<template>
  <div v-show="open && $ScheduleStore.nowGameInfo.defState==2"
  class="overflow-y-auto h-[48vh]">
  <div v-for="(row,rowID) in $ScheduleStore.temp_playersInSessions" >
<div class="w-full  h-auto flex flex-col gap-[20px]  ">

  <div class="w-full h-[65px] flex gap-[10px] px-[10px] items-center"  :class="{'h-[86px]':$ScheduleStore.nowGameInfo.roundID>200}">
    <!-- 編號 -->
    <div class="w-[50px] p-[10px] leading-[55px] flex-shrink-0">{{ rowID+1 }}</div>
    

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
      	<p v-if="$ScheduleStore.nowGameInfo.roundID<200"
        class="text-black_m">	&#40;{{ player.tName }}	&#41; {{ player.pName1 }}</p>
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
      <p class=" leading-[45px] text-[24px]  mr-[10px] "  
      :class="{'leading-[60px]':$ScheduleStore.nowGameInfo.roundID>200}"
      :style="{color: $ScheduleStore.temp_changePlayer_row!==-1 || $ScheduleStore.chosenPlayersArray.length>0 ?'#999999':'#DDDDDD'}">+ </p>
      
      <p v-if="$ScheduleStore.chosenGrid[0]==rowID && $ScheduleStore.chosenGrid[1] ==playerID && $ScheduleStore.chosenPlayersArray.length>0  " class="leading-[45px] " 
         :class="{'leading-[60px]':$ScheduleStore.nowGameInfo.roundID>200}"
         :style="{color: $ScheduleStore.chosenPlayersArray.length>0 ?'#999999':'#DDDDDD'}"> 新增至此</p>

      <!-- changePosition() -->
      <p @click="$ScheduleStore.CHANGE_PLAYERS($ScheduleStore.temp_changePlayer_row,$ScheduleStore.temp_changePlayer_sort,temp_changePlayer)"
      v-if="$ScheduleStore.chosenGrid[0]==rowID && $ScheduleStore.chosenGrid[1] ==playerID && $ScheduleStore.temp_changePlayer_row !==-1 && $ScheduleStore.chosenPlayersArray.length==0" class="leading-[45px] w-full  text-start" :style="{color: $ScheduleStore.temp_changePlayer_row!==-1  ?'#999999':'#DDDDDD'}"  :class="{'leading-[60px]':$ScheduleStore.nowGameInfo.roundID>200}"> 換位至此 </p>
    </button>
    </button>
    

  </div>

  <div class="w-full border-b-[1px] border-gray_l h-[1px] mb-[20px]"></div>

</div>
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

import { useScheduleStore } from "../../src/stores/schedule";
const $ScheduleStore = useScheduleStore();

const emits = defineEmits()
const { open, chosenStartState,
addSelectedPlayers,addAllPlayers } = defineProps(['open', 'chosenStartState','addSelectedPlayers','addAllPlayers']);

// const temp_playersInSessions= ref([])

let temp_playersInSessions = new Array(18).fill(null).map(() => ({
rowPlayers: Array.from({ length: 5 }, () => ({}))
}));


// 顯示提示文字：新增至此
const toggle_chosenGrid =(rowID,playerID)=>{
	console.log('111111111111111toggle_chosenGridtoggle_chosenGridtoggle_chosenGrid',rowID)
	console.log('22222222222222222toggle_chosenGridtoggle_chosenGridtoggle_chosenGrid',playerID)
  $ScheduleStore.chosenGrid = [rowID,playerID]
  console.log('起作用了~~~', $ScheduleStore.chosenGrid)
}

// 要換位置的選手
const temp_changePlayer =ref('')
// const $ScheduleStore.temp_changePlayer_row =ref(-1)
// const $ScheduleStore.temp_changePlayer_playerID =ref(-1)
const changePlayer =(rowID,playerID, player) =>{
temp_changePlayer.value = player
$ScheduleStore.temp_changePlayer_row = rowID
$ScheduleStore.temp_changePlayer_sort = playerID

$ScheduleStore.chosenPlayersArray =[]
// $ScheduleStore.CHANGE_PLAYERS(rowID,playerID, player)
}











</script>