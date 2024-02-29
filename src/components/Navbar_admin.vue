<template>
<!-- left -->
<div class="fixed w-[167px] h-screen bg-[#FFF] pl-[30px] pt-[40px] border-r-[1px] border-solid border-gray_l "
style="z-index: 500;" >
			<!-- logo -->
			<div class="mb-[40px] pl-[10px]" @mouseenter='hover(-1)'>
				<router-link to="/back">
				<svg width="81" height="51" viewBox="0 0 81 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="30.3749" cy="41.025" rx="10.125" ry="9.87771" fill="#12AFCE"/>
<rect y="6.63324" width="20.25" height="44.2694" rx="10.125" fill="#C3EED4"/>
<rect x="81" y="51" width="20.25" height="50.8702" rx="10.125" transform="rotate(-180 81 51)" fill="#C3EED4"/>
<rect x="60.7498" y="51" width="20.25" height="37.0414" rx="10.125" transform="rotate(-180 60.7498 51)" fill="#C6ECF4"/>
<ellipse cx="10.125" cy="41.025" rx="10.125" ry="9.87771" fill="#008D6E"/>
<ellipse cx="50.6253" cy="23.5767" rx="10.125" ry="9.87771" fill="#12AFCE"/>
<ellipse cx="70.8748" cy="9.87771" rx="10.125" ry="9.87771" fill="#008D6E"/>
				</svg>
				</router-link>


			</div>

			<!-- 選項區 -->
			<div class=" flex flex-col absolute top-[150px] ">
				<!--後臺首頁 -->
				<router-link to="/back">
								<div
									class="w-auto h-[20px] mb-[30px] text-[16px] flex gap-[10px] items-center"
                  :class="isHomePage ? 'text-[#222]' : 'text-[#222]'"
								>

									<div v-if="isHomePage">
										<div class="w-[107px] h-[32px] bg-[#E0F6E9] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%] " style="z-index:-10;"></div>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect x="2.5" y="2.5" width="6.66667" height="8.75" rx="1" fill="#222"/>
										<rect x="2.5" y="12.9165" width="6.66667" height="4.58333" rx="1" fill="#222"/>
										<rect x="10.833" y="2.5" width="6.66667" height="5" rx="1" fill="#222"/>
										<rect x="10.833" y="9.1665" width="6.66667" height="8.33333" rx="1" fill="#222"/>
										</svg>
									</div>
                  
										<div v-else >
											<div v-if="showHover == 0"
										class="w-[107px] h-[32px] bg-[#00000010] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%]  hover:text-white" style="z-index:-10;"></div>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect x="2.5" y="2.5" width="6.66667" height="8.75" rx="1" fill="#222"/>
										<rect x="2.5" y="12.9165" width="6.66667" height="4.58333" rx="1" fill="#222"/>
										<rect x="10.833" y="2.5" width="6.66667" height="5" rx="1" fill="#222"/>
										<rect x="10.833" y="9.1665" width="6.66667" height="8.33333" rx="1" fill="#222"/>
										</svg>
									</div>
									<span @mouseenter='hover(0)'>
										<!-- {{$t('Home')}} -->
									</span>
								</div>
				</router-link>

				<!-- 報名競賽 -->
				<router-link to="/back/register">
								<div
									class="w-auto h-[20px] mb-[30px] text-[16px]  text-[#222] flex gap-[10px] items-center relative">
                <div 
                    v-if="isRegisterPage"
									>
										<div class="w-[107px] h-[32px] bg-[#E0F6E9] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%] " style="z-index:-10;"></div>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4142 16L20 18.5858M19 11C19 14.866 15.866 18 12 18C8.13401 18 5 14.866 5 11C5 7.13401 8.13401 4 12 4C15.866 4 19 7.13401 19 11Z" stroke="#222222" stroke-width="2" stroke-linecap="round"/>
									</svg>

									
								</div>
									<div v-else >
										<div v-if="showHover == 5"
										class="w-[107px] h-[32px] bg-[#00000010] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%]  hover:text-white" style="z-index:-10;"></div>
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.4142 16L20 18.5858M19 11C19 14.866 15.866 18 12 18C8.13401 18 5 14.866 5 11C5 7.13401 8.13401 4 12 4C15.866 4 19 7.13401 19 11Z" stroke="#222222" stroke-width="2" stroke-linecap="round"/>
									</svg>
								

										
								</div>
								<span @mouseenter='hover(5)'>
									<!-- {{$t('Register for Competition')}} -->
									</span>

									
								</div>
				</router-link>

				<!-- 賽事管理 -->
				<router-link to="/back/allCompetitions">
								<div
									class="w-auto h-[20px] mb-[30px] text-[16px]  text-[#222] flex gap-[10px] items-center relative"
									  :class="{ 'text-[#222]' : !isHoldingPage && !isCompetitionPage ,}"
								>
							
                <div 
                    v-if="isCompetitionPage || isHoldingPage"
									>
										<div class="w-[107px] h-[32px] bg-[#E0F6E9] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%] " style="z-index:-10;"></div>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 10.566V7C2 6.52661 2.38721 6.14286 2.86486 6.14286H4.59459C5.07225 6.14286 5.45946 6.52661 5.45946 7V12.0124C5.45946 12.7416 4.59919 13.1378 4.03687 12.6675L2.30714 11.2211C2.11238 11.0583 2 10.8186 2 10.566Z" fill="#222222"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.32432 4.85714V12.3611C6.32432 13.4429 6.83944 14.4612 7.71403 15.1084L8.68874 15.8297C8.83818 15.9403 9.01968 16 9.20618 16H10.7938C10.9803 16 11.1618 15.9403 11.3113 15.8297L12.286 15.1084C13.1606 14.4612 13.6757 13.4429 13.6757 12.3611V4.85714C13.6757 4.38376 13.2885 4 12.8108 4H7.18919C6.71154 4 6.32432 4.38376 6.32432 4.85714ZM10.6486 6.88C10.6486 6.64331 10.455 6.45143 10.2162 6.45143C9.97739 6.45143 9.78378 6.64331 9.78378 6.88C9.78378 7.10756 9.68563 7.27972 9.49521 7.44881C9.30931 7.61389 9.07262 7.74453 8.80335 7.89314L8.70763 7.94607C8.49925 8.06172 8.42493 8.32288 8.54162 8.5294C8.65831 8.73592 8.92183 8.80958 9.13021 8.69393C9.16024 8.67726 9.19166 8.66001 9.2242 8.64215C9.39319 8.54938 9.59237 8.44003 9.78378 8.30965V11.2514H8.48649C8.24766 11.2514 8.05405 11.4433 8.05405 11.68C8.05405 11.9167 8.24766 12.1086 8.48649 12.1086H11.5135C11.7523 12.1086 11.9459 11.9167 11.9459 11.68C11.9459 11.4433 11.7523 11.2514 11.5135 11.2514H10.6486V6.88Z" fill="#222222"/>
<path d="M18 10.566V7C18 6.52661 17.6128 6.14286 17.1351 6.14286H15.4054C14.9278 6.14286 14.5405 6.52661 14.5405 7V12.0124C14.5405 12.7416 15.4008 13.1378 15.9631 12.6675L17.6929 11.2211C17.8876 11.0583 18 10.8186 18 10.566Z" fill="#222222"/>
								</svg>

									
								</div>
									<div v-else >
										<div v-if="showHover == 1"
										class="w-[107px] h-[32px] bg-[#00000010] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%]  hover:text-white" style="z-index:-10;"></div>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 10.566V7C2 6.52661 2.38721 6.14286 2.86486 6.14286H4.59459C5.07225 6.14286 5.45946 6.52661 5.45946 7V12.0124C5.45946 12.7416 4.59919 13.1378 4.03687 12.6675L2.30714 11.2211C2.11238 11.0583 2 10.8186 2 10.566Z" fill="#222"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.32432 4.85714V12.3611C6.32432 13.4429 6.83944 14.4612 7.71403 15.1084L8.68874 15.8297C8.83818 15.9403 9.01968 16 9.20618 16H10.7938C10.9803 16 11.1618 15.9403 11.3113 15.8297L12.286 15.1084C13.1606 14.4612 13.6757 13.4429 13.6757 12.3611V4.85714C13.6757 4.38376 13.2885 4 12.8108 4H7.18919C6.71154 4 6.32432 4.38376 6.32432 4.85714ZM10.6486 6.88C10.6486 6.64331 10.455 6.45143 10.2162 6.45143C9.97739 6.45143 9.78378 6.64331 9.78378 6.88C9.78378 7.10756 9.68563 7.27972 9.49521 7.44881C9.30931 7.61389 9.07262 7.74453 8.80335 7.89314L8.70763 7.94607C8.49925 8.06172 8.42493 8.32288 8.54162 8.5294C8.65831 8.73592 8.92183 8.80958 9.13021 8.69393C9.16024 8.67726 9.19166 8.66001 9.2242 8.64215C9.39319 8.54938 9.59237 8.44003 9.78378 8.30965V11.2514H8.48649C8.24766 11.2514 8.05405 11.4433 8.05405 11.68C8.05405 11.9167 8.24766 12.1086 8.48649 12.1086H11.5135C11.7523 12.1086 11.9459 11.9167 11.9459 11.68C11.9459 11.4433 11.7523 11.2514 11.5135 11.2514H10.6486V6.88Z" fill="#222"/>
<path d="M18 10.566V7C18 6.52661 17.6128 6.14286 17.1351 6.14286H15.4054C14.9278 6.14286 14.5405 6.52661 14.5405 7V12.0124C14.5405 12.7416 15.4008 13.1378 15.9631 12.6675L17.6929 11.2211C17.8876 11.0583 18 10.8186 18 10.566Z" fill="#222"/>
</svg>

										
								</div>
								<span @mouseenter='hover(1)'>
									<!-- {{$t('Event Management')}} -->
									</span>

									
								</div>
				</router-link>

				<!-- 球隊管理 -->
				<div
                 :class="isTeamPage ? 'text-[#222]' : 'text-[#222]'"
									class="w-auto h-[20px] mb-[30px] text-[16px] cursor-pointer translate-x-[-2px]  flex gap-[10px] items-center
									"
								>
                <div v-if="isTeamPage">
									<div class="w-[107px] h-[32px] bg-[#E0F6E9] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%] " style="z-index:-10;"></div>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.3454 9.69141C5.20796 9.69141 5.90925 8.99012 5.90925 8.12757C5.90925 7.26501 5.20796 6.56372 4.3454 6.56372C3.48284 6.56372 2.78156 7.26501 2.78156 8.12757C2.78156 8.99012 3.48284 9.69141 4.3454 9.69141ZM15.2923 9.69141C16.1549 9.69141 16.8562 8.99012 16.8562 8.12757C16.8562 7.26501 16.1549 6.56372 15.2923 6.56372C14.4298 6.56372 13.7285 7.26501 13.7285 8.12757C13.7285 8.99012 14.4298 9.69141 15.2923 9.69141ZM16.0742 10.4733H14.5104C14.0803 10.4733 13.6918 10.6468 13.4084 10.9278C14.3931 11.4678 15.0919 12.4428 15.2434 13.601H16.8562C17.2887 13.601 17.6381 13.2516 17.6381 12.8191V12.0372C17.6381 11.1746 16.9368 10.4733 16.0742 10.4733ZM9.81886 10.4733C11.3314 10.4733 12.5556 9.24914 12.5556 7.73661C12.5556 6.22407 11.3314 4.99988 9.81886 4.99988C8.30633 4.99988 7.08213 6.22407 7.08213 7.73661C7.08213 9.24914 8.30633 10.4733 9.81886 10.4733ZM11.6955 11.2553H11.4927C10.9844 11.4996 10.42 11.6462 9.81886 11.6462C9.21775 11.6462 8.65575 11.4996 8.14505 11.2553H7.94224C6.38817 11.2553 5.12732 12.5161 5.12732 14.0702V14.7739C5.12732 15.4214 5.65268 15.9468 6.30021 15.9468H13.3375C13.985 15.9468 14.5104 15.4214 14.5104 14.7739V14.0702C14.5104 12.5161 13.2495 11.2553 11.6955 11.2553ZM6.22934 10.9278C5.9459 10.6468 5.55738 10.4733 5.12732 10.4733H3.56348C2.70092 10.4733 1.99963 11.1746 1.99963 12.0372V12.8191C1.99963 13.2516 2.34906 13.601 2.78156 13.601H4.39183C4.54577 12.4428 5.24461 11.4678 6.22934 10.9278Z" fill="#222"/>
</svg>

								</div>
								<div v-else >
									<div v-if="showHover == 2"
										class="w-[107px] h-[32px] bg-[#00000010] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%]  hover:text-white" style="z-index:-10;"></div>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.3454 9.69141C5.20796 9.69141 5.90925 8.99012 5.90925 8.12757C5.90925 7.26501 5.20796 6.56372 4.3454 6.56372C3.48284 6.56372 2.78156 7.26501 2.78156 8.12757C2.78156 8.99012 3.48284 9.69141 4.3454 9.69141ZM15.2923 9.69141C16.1549 9.69141 16.8562 8.99012 16.8562 8.12757C16.8562 7.26501 16.1549 6.56372 15.2923 6.56372C14.4298 6.56372 13.7285 7.26501 13.7285 8.12757C13.7285 8.99012 14.4298 9.69141 15.2923 9.69141ZM16.0742 10.4733H14.5104C14.0803 10.4733 13.6918 10.6468 13.4084 10.9278C14.3931 11.4678 15.0919 12.4428 15.2434 13.601H16.8562C17.2887 13.601 17.6381 13.2516 17.6381 12.8191V12.0372C17.6381 11.1746 16.9368 10.4733 16.0742 10.4733ZM9.81886 10.4733C11.3314 10.4733 12.5556 9.24914 12.5556 7.73661C12.5556 6.22407 11.3314 4.99988 9.81886 4.99988C8.30633 4.99988 7.08213 6.22407 7.08213 7.73661C7.08213 9.24914 8.30633 10.4733 9.81886 10.4733ZM11.6955 11.2553H11.4927C10.9844 11.4996 10.42 11.6462 9.81886 11.6462C9.21775 11.6462 8.65575 11.4996 8.14505 11.2553H7.94224C6.38817 11.2553 5.12732 12.5161 5.12732 14.0702V14.7739C5.12732 15.4214 5.65268 15.9468 6.30021 15.9468H13.3375C13.985 15.9468 14.5104 15.4214 14.5104 14.7739V14.0702C14.5104 12.5161 13.2495 11.2553 11.6955 11.2553ZM6.22934 10.9278C5.9459 10.6468 5.55738 10.4733 5.12732 10.4733H3.56348C2.70092 10.4733 1.99963 11.1746 1.99963 12.0372V12.8191C1.99963 13.2516 2.34906 13.601 2.78156 13.601H4.39183C4.54577 12.4428 5.24461 11.4678 6.22934 10.9278Z" fill="#222"/>
								</svg>
								</div>
										<span @mouseenter='hover(2)'>
										<!-- {{$t('Team Management')}} -->
										</span>
				</div>

					<!-- 球員分析 -->
					<div
                 :class="isScorePage ? 'text-[#222]' : 'text-[#222]'"
									class="w-auto h-[20px] mb-[30px] text-[16px]  flex-shrink-0 flex gap-[5px] items-center"
								>
                <div v-if="isScorePage">
									<div class="w-[107px] h-[32px] bg-[#00000010] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%] " style="z-index:-10;"></div>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 8C2.5 7.44771 2.94772 7 3.5 7H4.71429C5.26657 7 5.71429 7.44771 5.71429 8V16.5C5.71429 17.0523 5.26657 17.5 4.71429 17.5H3.5C2.94771 17.5 2.5 17.0523 2.5 16.5V8ZM8.5 3.5C8.5 2.94772 8.94772 2.5 9.5 2.5H10.5C11.0523 2.5 11.5 2.94772 11.5 3.5V16.5C11.5 17.0523 11.0523 17.5 10.5 17.5H9.5C8.94772 17.5 8.5 17.0523 8.5 16.5V3.5ZM14.5 12.0714C14.5 11.5191 14.9477 11.0714 15.5 11.0714H16.5C17.0523 11.0714 17.5 11.5191 17.5 12.0714V16.5C17.5 17.0523 17.0523 17.5 16.5 17.5H15.5C14.9477 17.5 14.5 17.0523 14.5 16.5V12.0714Z" fill="#222"/>
</svg>

								</div>
										<div v-else class="cursor-pointer">
												<div v-if="showHover == 3"
												class="w-[107px] h-[32px] bg-[#00000010] rounded-[4px] absolute translate-y-[-15%] translate-x-[-5%] " style="z-index:-10;"></div>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 8C2.5 7.44771 2.94772 7 3.5 7H4.71429C5.26657 7 5.71429 7.44771 5.71429 8V16.5C5.71429 17.0523 5.26657 17.5 4.71429 17.5H3.5C2.94771 17.5 2.5 17.0523 2.5 16.5V8ZM8.5 3.5C8.5 2.94772 8.94772 2.5 9.5 2.5H10.5C11.0523 2.5 11.5 2.94772 11.5 3.5V16.5C11.5 17.0523 11.0523 17.5 10.5 17.5H9.5C8.94772 17.5 8.5 17.0523 8.5 16.5V3.5ZM14.5 12.0714C14.5 11.5191 14.9477 11.0714 15.5 11.0714H16.5C17.0523 11.0714 17.5 11.5191 17.5 12.0714V16.5C17.5 17.0523 17.0523 17.5 16.5 17.5H15.5C14.9477 17.5 14.5 17.0523 14.5 16.5V12.0714Z" fill="#222"/></svg>

									</div>
									
									<p class="cursor-pointer inline h-[20px] leading-[16px] ml-[6px]" @mouseenter='hover(3)'>
										球員分析
									</p>
						</div>

				
			</div>
			<div class=" w-full h-full absolute top-[330px]  left-[-10px]" @mouseenter="hover(-1)"></div>
			<div class=" w-[20px] h-screen absolute top-[0px] left-[150px] " @mouseenter="hover(-1)"></div>
</div>


<header
				class="w-[calc(100vw-167px)] h-[60px] fixed top-0 left-[167px] flex flex-wrap sm:justify-start sm:flex-nowrap  bg-[#FFF] text-sm pl-[2vw] pr-[2vw] py-[12px]
				border-b-[1px] border-solid border-gray_l"
        @click="closeMenuOnClickOutside"
				style=" z-index: 100"
			>
				<!-- <div
					class="bg-[#00000020] w-full h-screen absolute top-[60px] right-0 opacity-100 z-10 backdrop-blur-[1px]"
					v-if="isOptionsExpanded || isOptionsExpanded_member"
				>
				</div> -->

				<nav
					class="w-full relative z-50  justify-end flex
					 md:mx-0 md:max-w-[96vw]"
				>
				


					<!-- 右半邊 -->
					<div class="w-[300px]  flex justify-between items-center gap-[20px]">

						<!-- 選擇球隊 -->
						<div class="w-[144px] h-[20px] ">
								<select
								 @mouseleave="changeAuth($AdminStore.now_Team)"
								:disabled="isHoldingPage"
									placeholder="選擇球隊"
										v-model="now_Team"
										class="bg-#222 text-gray_d rounded-md  text-start border-solid border-[1px] border-gray_d
										focus:ring-white_m focus:border-gray_d font-medium text-[16px]  pl-3  translate-y-[-15%] 
										disabled:bg-#222"
										>
											<option
						v-for="(option, index) in TeamOption"
						:key="index"
						:value="option.tid"
						placeholder="請選擇球隊"
						style="padding-bottom: 20px; font-weight: 200;"
					>
						{{ option.tName }}
					</option>
					
								</select>
						</div>

						<!-- 身分切換 -->
							<div class="switch w-[100px] h-full  relative  text-end translate-y-[20%] " 	>
				<input
					@click="togglePublic()"
					type="checkbox"
					 :style="{ background: !switch_auth_admin ? '#C6ECF4' : '#C3EED4' }"
					class="absolute  left-0 shrink-0 w-[100px] h-[28px]  checked:bg-none rounded-full cursor-pointer transition-colors ease-in-out duration-200 
					before:inline-block before:w-6 before:h-6 before:bg-green_m before:translate-x-[-145%] before:translate-y-[8%] 
					
					checked:before:bg-blue_d checked:before:translate-x-[140%] checked:before:translate-y-[5%] before:shadow-md before:rounded-full before:transform before:transition before:ease-in-out before:duration-200 "
				/>
				<span
					class="text-green_m text-[14px] absolute  right-[4px] top-[4px] " v-if="switch_auth_admin"
					>管理模式</span
				>
				<span class="text-blue_d text-[14px] absolute  top-[4px] left-[10px]"  v-else
					>選手模式</span
				>
			</div>
          

			<!-- 個人區域 -->
					

					<img
					v-if="switch_auth_admin"
						src="../assets/images/admin/member_auth.png"
						alt=""
						class="w-[36px] h-[36px] navbar_dropdown transform transition-transform duration-200 ease-in-ou cursor-pointer"
						@click="toggleOptionsExpanded_member"
					/>
					<img
					v-else
						src="../assets/images/admin/member_player.png"
						alt=""
						class="w-[36px] h-[36px] navbar_dropdown transform transition-transform duration-200 ease-in-ou cursor-pointer"
						@click="toggleOptionsExpanded_member"
					/>
					</div>
					<!-- @blur="isOptionsExpanded_member_blur " -->
					<!-- <transition
						enter-active-class="transform transition duration-500 ease-custom"
						enter-class="-translate-y-1/2 scale-y-0 opacity-0"
						enter-to-class="translate-y-0 scale-y-100 opacity-100"
						leave-active-class="transform transition duration-300 ease-custom"
						leave-class="translate-y-0 scale-y-100 opacity-100"
						leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
					> -->
						<ul
							v-show="isOptionsExpanded_member"
							class="navbar_member  w-[206px] h-[253px] rounded-[4px]
							pt-[18px] px-[20px] py-[11px]  
							absolute top-[55px] text-[#222] text-[14px] bg-[#FEFEFE] overflow-hidden text-center "
							style="box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1); z-index: 100"
						>
						<div class="w-full h-[25px] leading-[25px]  flex gap-[10px] items-center text-[14px] mb-[10px]">
							<!-- 姓名 -->
							<!-- <p>{{$store.userName}}</p> -->
							<!-- 身分別 -->
							<p class="w-[59px] rounded-[6px] text-center bg-green_l ">{{ setAuth(nowAuth)}}</p>
						</div>

						<div class="w-full h-[25px] leading-[25px]  flex gap-[10px] items-center text-[12px] mb-[10px]">
							<!-- mail -->
							<p class="text-green_m ">
								<!-- {{$store.userEmail_remember}} -->
							</p>
						</div>

						<div class="w-[206px] h-[1px] bg-gray_l translate-x-[-20px] mb-[10px]"></div>


						
							
							<div class="w-full  h-[44px] text-[16px]  text-start  mt-[106px] absolute text-gray_m leading-[44px]" @click="logout()">
								{{ $t('Logout') }}
							</div>

							<!-- @click="$store.CLEAR_USER" -->
						</ul>
					<!-- </transition> -->
				</nav>
</header>
 </template>

 <script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
// import { useUserStore } from "../../src/stores/user.js";
// import { useAdminStore } from "../../src/stores/admin.js";

// import { usePlayersStore } from "../../src/stores/player.js";

// import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const $store = useUserStore();
const $AdminStore = useAdminStore();

const props = defineProps(['open', 'data']);
const emit = defineEmits();


// 判斷頁面
const isHomePage = route.path === '/back';
const isCompetitionPage = route.path.startsWith('/back/allCompetitions');
const isRegisterPage = route.path.startsWith('/back/register');
const isHoldingPage = route.path.startsWith('/back/holdCompetition/');
// 修正
const isTeamPage = route.path.startsWith('/back/team/');
const isScorePage = route.path.startsWith('/back/score/');

// hover 顯示
const showHover =ref(-1)
const hover=(index) =>{
showHover.value= index
}







// 選擇球隊

const TeamOption = ref([
{tid: '0', tName: '請選擇球隊', tRole: 0},]);

// switch button 管理/個人
const switch_auth_admin = ref(1);

const togglePublic = () => {
	switch_auth_admin.value = !switch_auth_admin.value;
	// router.push('/')
};

// 判斷權限
const setAuth=(auth)=>{
if(auth==1) {
	return '管理者'
} else if (auth==2){
	return '教練'
	
}else if (auth==3){
	return '選手'
	
}
}

const logout = async () => {
	try {
		$store.CLEAR_USER();
		router.push("/");
		// window.location.reload();


	} catch (error) {
		// console.log(error);
	}
};
const isTW = ref(false)
const isCN = ref(false)
const isEN = ref(false)

onMounted(()=>{
now_Team.value=$AdminStore.now_Team
		// $AdminStore.now_Team  = now_Team.value

	// 匯入球隊
	for(let i =0; i< $AdminStore.teamsArray.length; i++) {
		TeamOption.value.push($AdminStore.teamsArray[i])
	}
	// // console.log(TeamOption.value)

	
	
	// 判斷當前語言
	const lang=JSON.parse(localStorage.getItem('locale'))
	// // console.log(lang.locale)
	if(lang.locale == 'tw') {
		isTW.value = true
		isCN.value = false
		isEN.value == false
	}	else if(lang.locale == 'cn') {
		isCN.value = true
		isTW.value = false
		isEN.value = false
	} else {
		isEN.value = true
		isCN.value = false
		isTW.value = false
	}
})
const now_Team = ref(1)

watch(now_Team, (oldTeam,newTeam) => {
	if(oldTeam !== newTeam) {
		$AdminStore.now_Team = now_Team.value
		// console.log($AdminStore.now_Team)
		changeAuth($AdminStore.now_Team)
		emit('callComList');
		// window.location.reload();
	}
})



// header
let isOptionsExpanded = ref(false);
let isOptionsExpanded_member = ref(false);

const closeMenuOnClickOutside = (event) => {
	// 如果菜单未展开，不执行任何操作
	if (!isOptionsExpanded.value && !isOptionsExpanded_member.value) return;

	const isClickInsideMenu = event.target.closest(".navbar_dropdown"); // 用你的菜单类名替换
	const isClickInsideButton = event.target.closest(".nav_show_bar_member"); // 用你的按钮类名替换

	// 如果点击的不是菜单内部或按钮，则关闭菜单
	if (!isClickInsideMenu && !isClickInsideButton) {
		isOptionsExpanded.value = false;
		isOptionsExpanded_member.value = false;
		show_lang.value = false
	}
};

let toggleOptionsExpanded = () => {
	isOptionsExpanded.value = !isOptionsExpanded.value;
	show_lang.value = false
};
let toggleOptionsExpanded_member = () => {
	isOptionsExpanded_member.value = !isOptionsExpanded_member.value;
};

const  show_lang =ref(false)
const toggle_show_lang =() => {
show_lang.value = !show_lang.value
}

const change_lang = (lang) => {
	$store.SET_LOCALE(lang)
	location. reload()
}


// 變換當前權限
const nowAuth = ref(0)

const changeAuth= (team) => {
	// console.log('team')
	// console.log(team)
	// // console.log(true)
	// $store.userAuth 

	
	$AdminStore.changeCurrentAuth()
	// JSON.parse()
	const userAuth_localStorage = localStorage.getItem('userAuth')
const userAuthObject = JSON.parse(userAuth_localStorage);
const userAuthValue = userAuthObject.userAuth;

// console.log('使用者權限：' + userAuthValue);
nowAuth.value = userAuthValue
	

}
// 變換當前權限







</script>
