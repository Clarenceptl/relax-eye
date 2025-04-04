<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarTrigger />
    <main class="flex flex-col items-center justify-center h-screen w-full">
      <Countdown class="w-sm" />
    </main>
  </SidebarProvider>
</template>
<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import Countdown from '@/views/Countdown.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
</script>
<style scoped></style>
