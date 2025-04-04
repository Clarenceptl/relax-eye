<template>
   <Card>
    <!-- <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader> -->
    <CardContent class="flex flex-col items-center justify-center">
      <Timer :minutes="timerVM.minutes" :seconds="timerVM.seconds" />
    </CardContent>
    <CardFooter>
      <Button @click="timerVM.minutes++">Test</Button>
    </CardFooter>
  </Card>
</template>
<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Timer } from '@/components/ui/timer';
import { ref } from 'vue';
import Button from './ui/button/Button.vue';


const timerVM = ref({
  minutes: 0,
  seconds: 0,
});
</script>