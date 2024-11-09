import { faker } from "@faker-js/faker";

const videoUrls = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://rpbcompany.com.br/static/1.mp4",
  "https://rpbcompany.com.br/static/2.mp4",
  "https://rpbcompany.com.br/static/3.mp4",
  "https://rpbcompany.com.br/static/4.mp4",
  "https://rpbcompany.com.br/static/5.mp4",
  "https://rpbcompany.com.br/static/6.mp4",
  "https://rpbcompany.com.br/static/7.mp4",
  "https://rpbcompany.com.br/static/8.mp4",
  "https://rpbcompany.com.br/static/9.mp4",
  "https://rpbcompany.com.br/static/10.mp4",
  "https://rpbcompany.com.br/static/11.mp4",
  "https://rpbcompany.com.br/static/12.mp4",
  "https://rpbcompany.com.br/static/13.mp4",
  "https://rpbcompany.com.br/static/14.mp4",
  "https://rpbcompany.com.br/static/15.mp4",
  "https://rpbcompany.com.br/static/16.mp4",
  "https://rpbcompany.com.br/static/17.mp4",
  "https://rpbcompany.com.br/static/18.mp4",
  "https://rpbcompany.com.br/static/19.mp4",
  "https://rpbcompany.com.br/static/20.mp4",
];

export function getRandomVideoUrl() {
  return faker.helpers.arrayElement(videoUrls);
}
