<template>
  <Card>
    <CardHeader>
      <slot name="header" />
      <Toggle
        variant="outline"
        aria-label="Toggle focus mode"
        v-model="focusWindow"
      >
        <p>Focus window</p>
      </Toggle>
    </CardHeader>
    <CardContent class="flex flex-col items-center justify-center">
      <Timer :minutes="timerVM.minutes" :seconds="timerVM.seconds" />
    </CardContent>
    <CardFooter class="flex gap-2">
      <Button variant="destructive" @click="resetTimer">Reset timer</Button>
      <Button @click="start" :disabled="currentInterval">Start</Button>
    </CardFooter>
  </Card>
</template>
<script setup lang="ts">
//#region Imports
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import { Timer } from '@/components/ui/timer';
import { Toggle } from '@/components/ui/toggle';
import { sendNotification } from '@/helpers/notification';
import { computed, onUnmounted, ref } from 'vue';
//#endregion

//#region Constants, Refs & Computed
const INIT_WORK_TIME_MIN = 20;
const INIT_BREAK_TIME_SEC = 30;

const currentDate = ref<Date>(new Date());
const focusWindow = ref(true);
const timerVM = ref({
  minutes: INIT_WORK_TIME_MIN,
  seconds: 0
});
const currentInterval = ref<NodeJS.Timeout | null>(null);

const countDownWork = computed<number>(() =>
  new Date(
    currentDate.value.setMinutes(
      currentDate.value.getMinutes() + INIT_WORK_TIME_MIN
    )
  ).getTime()
);
const countDownBreak = computed<number>(() =>
  new Date(
    currentDate.value.setSeconds(
      currentDate.value.getSeconds() + INIT_BREAK_TIME_SEC
    )
  ).getTime()
);
//#endregion

//#region Methods
const getMinutes = (time: number) => {
  return Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
};

const getSecondes = (time: number) => {
  return Math.floor((time % (1000 * 60)) / 1000);
};

const clearCurrentInterval = () => {
  if (currentInterval.value) {
    clearInterval(currentInterval.value);
    currentInterval.value = null;
  }
};

const triggerFocusWindow = () => {
  if (focusWindow.value) {
    window.ipcRenderer.send('focus-main-window');
  }
};

const count = (isWorking: boolean) => {
  const now = new Date().getTime();
  const distance =
    (isWorking ? countDownWork.value : countDownBreak.value) - now;

  timerVM.value.seconds = getSecondes(distance);
  if (isWorking) {
    timerVM.value.minutes = getMinutes(distance);
  }
  if (distance < 0 && currentInterval.value) {
    clearCurrentInterval();
    sendNotification(
      'Pomodoro',
      isWorking ? 'Time to take a break!' : 'Time to work!'
    );
    if (isWorking) {
      timerBreak();
      triggerFocusWindow();
    } else {
      timerWork();
    }
  }
};

const timerWork = () => {
  currentDate.value = new Date();
  currentInterval.value = setInterval(() => count(true), 1000);
  Object.assign(timerVM.value, {
    minutes: INIT_WORK_TIME_MIN - 1,
    seconds: 59
  });
};

const timerBreak = () => {
  currentDate.value = new Date();
  currentInterval.value = setInterval(() => count(false), 1000);
  Object.assign(timerVM.value, {
    minutes: 0,
    seconds: INIT_BREAK_TIME_SEC - 1
  });
};

const resetTimer = () => {
  currentDate.value = new Date();
  timerVM.value.minutes = INIT_WORK_TIME_MIN;
  timerVM.value.seconds = 0;
  clearCurrentInterval();
};

const start = () => {
  clearCurrentInterval();
  timerWork();
};
//#endregion

//#region Initialization
window.ipcRenderer.on('clear-timer', () => {
  resetTimer();
});

window.ipcRenderer.on('restart', () => {
  start();
});
//#endregion

//#region Lifecycle Hooks
onUnmounted(() => {
  clearCurrentInterval();
});
//#endregion
</script>
