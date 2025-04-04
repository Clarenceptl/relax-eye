<template>
  <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
    <!-- <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
      <span class="countdown font-mono text-5xl">
        <span style="--value:15;" aria-live="polite" aria-label="15">15</span>
      </span>
      days
    </div>
    <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
      <span class="countdown font-mono text-5xl">
        <span style="--value:10;" aria-live="polite" aria-label="10">10</span>
      </span>
      hours
    </div> -->
    <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2 bg-pink-500">
      <span class="countdown font-mono text-5xl flip-horizontal-top">
        <span style="--value:24;" aria-live="polite" aria-label="24">{{ minutes }}</span>
      </span>
      min
    </div>
    <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
      <span class="countdown font-mono text-5xl">
        <span style="--value:59;" aria-live="polite" aria-label="59">{{ seconds }}</span>
      </span>
      sec
    </div>
  </div>
</template>
<script setup>
defineProps({
  minutes:{
    type: Number,
    default: 0,
  },
  seconds:{
    type: Number,
    default: 0,
  },
})
</script>
<style scoped>
.flip-horizontal-top {
	-webkit-animation: flip-horizontal-top 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
	        animation: flip-horizontal-top 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
}

@-webkit-keyframes flip-horizontal-top {
  0% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
  }
  100% {
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
  }
}
@keyframes flip-horizontal-top {
  0% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
  }
  100% {
    -webkit-transform: rotateX(180deg);
            transform: rotateX(180deg);
  }
}
</style>