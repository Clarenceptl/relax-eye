<template>
  <Card>
    <CardHeader>
      <slot name="header" />
      <Toggle variant="outline" aria-label="Toggle focus mode" v-model="focusWindow">
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
const INIT_WORK_TIME = 20;
const INIT_BREAK_TIME = 30;

const initDateTimer = ref<Date>(new Date());
const focusWindow = ref(true);
const timerVM = ref({
  minutes: INIT_WORK_TIME,
  seconds: 0
});
const currentInterval = ref<NodeJS.Timeout | null>(null);

const countDownWork = computed<number>(() =>
  new Date(
    initDateTimer.value.setMinutes(initDateTimer.value.getMinutes() + INIT_WORK_TIME)
  ).getTime()
);
const countDownBreak = computed<number>(() =>
  new Date(
    initDateTimer.value.setSeconds(initDateTimer.value.getSeconds() + INIT_BREAK_TIME)
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
}

const timerWork = () => {
  const count = () => {
    const now = new Date().getTime();
    const distance = countDownWork.value - now;

    timerVM.value.minutes = getMinutes(distance);
    timerVM.value.seconds = getSecondes(distance);

    if (distance < 0 && currentInterval.value) {
      clearCurrentInterval();
      sendNotification(
        'Pomodoro',
        'Time to take a break!'
      );
      timerBreak();
      triggerFocusWindow();
    }
  };
  initDateTimer.value = new Date();

  currentInterval.value = setInterval(count, 1000);
  // First count
  Object.assign(timerVM.value, {
    minutes: 19,
    seconds: 59
  });
};

const timerBreak = () => {
  const count = () => {
    const now = new Date().getTime();
    const distance = countDownBreak.value - now;

    timerVM.value.seconds = getSecondes(distance);

    if (distance < 0 && currentInterval.value) {
      clearCurrentInterval();
      sendNotification(
        'Pomodoro',
        'Time to work!'
      );
      timerWork();
    }
  };
  initDateTimer.value = new Date();

  currentInterval.value = setInterval(count, 1000);
  // First count
  Object.assign(timerVM.value, {
    minutes: 0,
    seconds: 29
  });
};

const resetTimer = () => {
  initDateTimer.value = new Date();
  timerVM.value.minutes = INIT_WORK_TIME;
  timerVM.value.seconds = 0;
  clearCurrentInterval();
};

const start = () => {
  clearCurrentInterval();
  timerWork();
};
//#endregion

onUnmounted(() => {
  clearCurrentInterval();
});
</script>
