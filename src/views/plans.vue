<template>
  <div>
    <div v-for="plan in plans" :key="plan.day">
      <v-card class="mx-3 my-3" max-width="800">
        <v-card-text>
          <div class="body-1">day{{ plan.day }}</div>
          <p></p>
          <p class="headline text--primary">
            {{ plan.title }}
          </p>
          <p></p>
          <v-list class="transparent">
            <v-list-item v-for="list in plan.lists" :key="list.type">
              <v-list-item-content>
                {{ list.time }} {{ list.content }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="deep-purple accent-4">
            More
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plans: [
        {
          day: "1",
          title: "hello,sweden!",
          lists: [
            {
              type: "transport",
              content: "アーランダ空港に到着",
              time: "10:30"
            },
            {
              type: "transport",
              content: "電車でストックホルム中心地へ",
              time: "12:00"
            },
            {
              type: "meal",
              content: "ホテルに荷物を置いてお昼ごはん",
              time: "12:30"
            },
            {
              type: "hotel",
              content: "&hostel",
              time: "12:30"
            }
          ]
        },
        {
          day: "2",
          title: "stockholm市内観光",
          lists: [
            {
              type: "sightseeing",
              content: "ガムラスタンを散策",
              time: "9:30"
            },
            {
              type: "meal",
              content: "Slussen、お魚の屋台でごはん",
              time: "12:00"
            },
            {
              type: "sightseeing",
              content: "スーデルマルムで古着屋さんにいく",
              time: "12:30"
            },
            {
              type: "transport",
              content: "多分くたくたなので電車で戻る",
              time: "16:30"
            },
            {
              type: "hotel",
              content: "&hostel",
              time: "12:30"
            }
          ]
        },
        {
          day: "3",
          title: "北へ",
          lists: [
            {
              type: "transport",
              content: "アーランダ空港バスに乗る",
              time: "9:30"
            },
            {
              type: "transport",
              content: "キールナ行きの飛行機に乗る",
              time: "11:00"
            },
            {
              type: "meal",
              content: "キールナ空港の近くでご飯",
              time: "12:30"
            },
            {
              type: "hotel",
              content: "アイスホテル",
              time: "16:30"
            }
          ]
        }
      ]
    };
  }
};
</script>
