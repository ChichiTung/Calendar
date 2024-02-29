<template>
  <div 
	class="bg-green_lightest relative h-screen w-screen">
  <Navbar/>
	<GoTop/>
		

  <div class="w-[calc(100vw-167px)] left-[167px] bg-green_lightest  h-auto relative pb-[30px]">


  <!-- 導向成績管理 -->
  <div v-if="isPastDate($FormStore.competitionInfo[0].competitionStartDate)"
  class="w-[calc(100vw-260px)]  h-[64px] mb-[30px]  lg:pr-[2vw]">
    <div class="w-full  h-[64px] bg-green_lighter mb-[30px] md:ml-[3vw] md:mr-[2vw]  lg:mx-[4vw] p-[20px]
    flex justify-between">
      <p class="tracking-wider">此競賽已經開始進行，可以前往成績管理 </p>
      <router-link :to="'/back/holdCompetition/4/' + now_cid" class="text-green_m">前往成績管理 ></router-link >
    </div>
  </div>

	<!-- 輪數設定section-->
     <Round 
   :tid="tid" :userToken="userToken"
   :saveAll_api="saveAll_api" :open="openRound"
  @roundFinished="toggle_openSchedule()"
   >

   </Round>
	
	
	<!-- 安排競賽日程 -->
	<Schedule  :tid="tid" :userToken="userToken"
  :open='!openSchedule'
  @showSchedule="toggle_openRound()"></Schedule>


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
} from "vue";

import Navbar from '../../src/components/Navbar_admin.vue';
// import TopSection from '@/components/admin_function/Top_HoldGame.vue'
// import NameSection from '@/components/admin_function/Section_CompetitionName.vue'
import Round from '@/components/admin_function/Hold_Step3/Round.vue'
import Schedule from '@/components/admin_function/Hold_Step3/Schedule.vue'



import { useFormStore } from "../../src/stores/form";
const $FormStore = useFormStore();

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const now_cid = route.params.cid


// userToken
  const userToken_localStorage = JSON.parse(localStorage.getItem("userToken"))
  const userToken =userToken_localStorage.userToken

	// tid
  const tid_localStorage = JSON.parse(localStorage.getItem('now_Team'))
  const tid = tid_localStorage.now_Team

// 判斷 競賽日期  是否大於今天 => 提示顯示與否
const isPastDate = (dateString) => {
  const today = new Date();
  const competitionStartDate = new Date(dateString);
  return competitionStartDate < today;
};


const openSchedule = ref(true)
const toggle_openSchedule=()=>{
openSchedule.value = !openSchedule.value
}

const openRound= ref(false)
const toggle_openRound=()=>{
openRound.value = !openRound.value
}

watch(openRound,(newVal)=>{
  if(newVal==false) openSchedule.value=true
  else openSchedule.value=false
})
watch(openSchedule,(newVal)=>{
  if(newVal==false) openRound.value=true
  else openRound.value=false
})




</script>