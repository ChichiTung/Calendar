<template>
  <div v-if="open"
  class="popup-wrap  z-200 bg-black/20" id="DeleteCompetition_alert" style="z-index: 10000;">
      <div class=" w-[440px] h-[224px] p-[20px] pb-[30px] bg-[#FEFEFE] rounded-[12px] shadow-lg
      fixed top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] z-300 text-center"> 
            <!-- 關掉 按鈕 -->
          <div class="w-full flex justify-end mb-[10px]">
        <button @click="toggle_closePopup()"
        class="w-[15px] h-[15px]">
        <img src="../../../assets/images/close.png" class="w-full h-full">
        </button>
          </div>
          <h1 class="text-[24px] font-semibold leading-[36px] mb-[10px]">刪除競賽？</h1>
          <p class="text-[16px] mb-[30px] text-start">刪除後將無法復原，您會移除所有與此賽程有關的資料</p>
          <!-- 確認刪除按鈕 -->
          <div class="w-full flex  justify-center gap-[10px] ">
              <button @click="toggle_closePopup()"
               class="w-[81px] h-[40px] rounded-[50px] text-[16px] border-solid border-[1px] border-[#999] bg-white_wb text-[#999]">
                 取消
               </button>

               <button @click="toggle_delete()"
               class="w-[115px] h-[40px] rounded-[50px] text-[16px] bg-[#FFB6B6] text-[#222]">
                  確認刪除
               </button>

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
} from "vue";


import { useScheduleStore } from "../../src/stores/schedule";
const $ScheduleStore = useScheduleStore();



const emits = defineEmits()

const { open, } = defineProps(['open', ]);

const toggle_closePopup =() =>{
  emits('close')
}
const toggle_delete=()=>{
  console.log('要刪除囉')
  emits('delete')
}

</script>