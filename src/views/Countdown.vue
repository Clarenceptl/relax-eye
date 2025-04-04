<template>
  <Card>
    <CardHeader>
      <slot name="header" />
    </CardHeader>
    <CardContent class="flex flex-col items-center justify-center">
      <Timer :minutes="timerVM.minutes" :seconds="timerVM.seconds" />
    </CardContent>
    <CardFooter class="flex gap-2">
      <Button variant="destructive" @click="resetTimer">Reset timer</Button>
      {{ currentInterval }}
      <Button  @click="start" :disabled="currentInterval">Start</Button>
    </CardFooter>
  </Card>
</template>
<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import { Timer } from '@/components/ui/timer';
import { computed, onBeforeUnmount, ref } from 'vue';

const initDateTimer = ref<Date>(new Date());
const countDownWork = computed<number>(() =>
  new Date(
    initDateTimer.value.setMinutes(
      initDateTimer.value.getMinutes() + 20,
    )
  ).getTime()
);
const countDownBreak = computed<number>(() =>
  new Date(
    initDateTimer.value.setSeconds(
      initDateTimer.value.getSeconds() + 30,
    )
  ).getTime()
);

const timerVM = ref({
  minutes: 20,
  seconds: 0
});

const currentInterval = ref<NodeJS.Timeout | null>(null);

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

const timerWork = () => {
  const count = () => {
    const now = new Date().getTime();
    const distance = countDownWork.value - now;

    timerVM.value.minutes = getMinutes(distance);
    timerVM.value.seconds = getSecondes(distance);

    if (distance < 0 && currentInterval.value) {
      clearCurrentInterval();
      timerBreak();
    }
  }
  initDateTimer.value = new Date();

  currentInterval.value = setInterval(count, 1000);
  // First count
  Object.assign(timerVM.value, {
    minutes: 19,
    seconds: 59,
  });
};

const timerBreak = () => {
  const count = () => {
    const now = new Date().getTime();
    const distance = countDownBreak.value - now;

    timerVM.value.seconds = getSecondes(distance);

    if (distance < 0 && currentInterval.value) {
      clearCurrentInterval();
      timerWork();
    }
  }
  initDateTimer.value = new Date();
  
  currentInterval.value = setInterval(count, 1000);
  // First count
  Object.assign(timerVM.value, {
    minutes: 0,
    seconds: 29,
  });
};

const resetTimer = () => {
  initDateTimer.value = new Date();
  timerVM.value.minutes = 20;
  timerVM.value.seconds = 0;
  clearCurrentInterval();
};

const start = () => {
  clearCurrentInterval();
  timerWork();
};

// timerWork();
onBeforeUnmount(() => {
  clearCurrentInterval();
});
</script>