<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Relax eyes</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <DarkMode />
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                  <a :href="item.url">
                    <component :is="item.icon" />
                    <span>{{item.title}}</span>
                  </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { Home } from "lucide-vue-next";
import DarkMode from "./DarkMode.vue";

// Menu items.
const items: any[] = [
  // {
  //   title: "Home",
  //   url: "#",
  //   icon: Home,
  // },
];
</script>
