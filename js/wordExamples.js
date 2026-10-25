const WORD_EXAMPLES = {
  "က": {
    words: [
      { my: "ကောင်းကင်", en: "sky" },
      { my: "အကင်", en: "grilled food" },
      { my: "ကလေး", en: "child" },
      { my: "ကမ္ဘာ", en: "world" }
    ],
    sentence: { my: "ကောင်းကင်သည် အပြာရောင် ဖြစ်သည်။", en: "The sky is blue." }
  },
  "ခ": {
    words: [
      { my: "ခရီး", en: "trip" },
      { my: "ခွေး", en: "dog" },
      { my: "ခေါင်း", en: "head" },
      { my: "ခန်းမ", en: "hall" }
    ],
    sentence: { my: "ကျွန်တော် ခရီးသွားချင်သည်။", en: "I want to travel." }
  },
  "ဂ": {
    words: [
      { my: "ဂီတ", en: "music" },
      { my: "ဂုဏ်", en: "honor" },
      { my: "ဂဏန်း", en: "number / crab" },
      { my: "ဂျပန်", en: "Japan" }
    ],
    sentence: { my: "သူသည် ဂီတကို ကြိုက်သည်။", en: "He likes music." }
  },
  "ဃ": {
    words: [
      { my: "ဃန", en: "dense / solid" },
      { my: "ဃာန", en: "place / base" },
      { my: "မေဃ", en: "cloud" }
    ],
    sentence: { my: "မေဃများ ကောင်းကင်တွင် ရှိသည်။", en: "Clouds are in the sky." }
  },
  "င": {
    words: [
      { my: "ငါး", en: "fish / five" },
      { my: "ငှက်", en: "bird" },
      { my: "ငွေ", en: "money / silver" },
      { my: "ငြိမ်းချမ်းရေး", en: "peace" }
    ],
    sentence: { my: "ငှက်သည် ကောင်းကင်တွင် ပျံသည်။", en: "The bird flies in the sky." }
  },
  "စ": {
    words: [
      { my: "စာ", en: "letter / lesson" },
      { my: "စကား", en: "speech / word" },
      { my: "စက်", en: "machine" },
      { my: "စေတနာ", en: "kind intention" }
    ],
    sentence: { my: "ကျွန်တော် စာရေးနေသည်။", en: "I am writing." }
  },
  "ဆ": {
    words: [
      { my: "ဆရာ", en: "teacher" },
      { my: "ဆိုင်", en: "shop" },
      { my: "ဆန်", en: "rice" },
      { my: "ဆေး", en: "medicine" }
    ],
    sentence: { my: "ဆရာသည် စာသင်ပေးသည်။", en: "The teacher teaches." }
  },
  "ဇ": {
    words: [
      { my: "ဇာတ်လမ်း", en: "story" },
      { my: "ဇွဲ", en: "perseverance" },
      { my: "ဇနီး", en: "wife" },
      { my: "ဇယား", en: "table / chart" }
    ],
    sentence: { my: "ဇွဲရှိလျှင် အောင်မြင်နိုင်သည်။", en: "With perseverance, success is possible." }
  },
  "ဈ": {
    words: [
      { my: "ဈေး", en: "market / price" },
      { my: "ဈေးဆိုင်", en: "shop" },
      { my: "ဈေးဝယ်", en: "shopping" }
    ],
    sentence: { my: "မေမေ ဈေးသို့ သွားသည်။", en: "Mother goes to the market." }
  },
  "ည": {
    words: [
      { my: "ည", en: "night" },
      { my: "ညီ", en: "younger brother" },
      { my: "ညီမ", en: "younger sister" },
      { my: "ညွှန်ကြားချက်", en: "instruction" }
    ],
    sentence: { my: "ညတွင် လမင်း ထွန်းလင်းသည်။", en: "The moon shines at night." }
  },
  "ဋ": {
    words: [
      { my: "ဋီကာ", en: "commentary" },
      { my: "ဋ္ဌာန", en: "department / place" }
    ],
    sentence: { my: "ဋီကာသည် စာကို ရှင်းပြသည်။", en: "A commentary explains the text." }
  },
  "ဌ": {
    words: [
      { my: "ဌာန", en: "department / place" },
      { my: "ဌေး", en: "wealthy / name" },
      { my: "ဌာနချုပ်", en: "headquarters" }
    ],
    sentence: { my: "သူသည် ဌာနချုပ်တွင် အလုပ်လုပ်သည်။", en: "He works at the headquarters." }
  },
  "ဍ": {
    words: [
      { my: "ဍာရီ", en: "clock / watch" },
      { my: "ဍဟ", en: "letter example" }
    ],
    sentence: { my: "ဍသည် မြန်မာဗျည်းတစ်လုံး ဖြစ်သည်။", en: "Da is one Myanmar consonant." }
  },
  "ဎ": {
    words: [
      { my: "ဎဟ", en: "letter example" },
      { my: "ဎသည်", en: "dha letter form" }
    ],
    sentence: { my: "ဎ ကို ရှင်းလင်းစွာ ရေးပါ။", en: "Write dha clearly." }
  },
  "ဏ": {
    words: [
      { my: "ဏ", en: "na consonant" },
      { my: "ပဏာမ", en: "preliminary" },
      { my: "ဏန်း", en: "number form" }
    ],
    sentence: { my: "ဏ သည် အသုံးနည်းသော ဗျည်းတစ်လုံး ဖြစ်သည်။", en: "Na is a less commonly used consonant." }
  },
  "တ": {
    words: [
      { my: "တောင်", en: "mountain / south" },
      { my: "တံတား", en: "bridge" },
      { my: "တစ်", en: "one" },
      { my: "တိုက်", en: "building / attack" }
    ],
    sentence: { my: "တံတားပေါ်တွင် လူများ လျှောက်နေသည်။", en: "People are walking on the bridge." }
  },
  "ထ": {
    words: [
      { my: "ထမင်း", en: "rice / meal" },
      { my: "ထီး", en: "umbrella" },
      { my: "ထိုင်", en: "sit" },
      { my: "ထွက်", en: "go out" }
    ],
    sentence: { my: "မိုးရွာသောကြောင့် ထီးယူပါ။", en: "Take an umbrella because it is raining." }
  },
  "ဒ": {
    words: [
      { my: "ဒေါင်း", en: "peacock" },
      { my: "ဒဏ်ရာ", en: "wound" },
      { my: "ဒေသ", en: "region" },
      { my: "ဒုက္ခ", en: "trouble / suffering" }
    ],
    sentence: { my: "ဒေါင်းသည် လှပသော ငှက်ဖြစ်သည်။", en: "The peacock is a beautiful bird." }
  },
  "ဓ": {
    words: [
      { my: "ဓာတ်ပုံ", en: "photo" },
      { my: "ဓား", en: "knife / sword" },
      { my: "ဓမ္မ", en: "dhamma / teaching" },
      { my: "ဓာတ်", en: "element" }
    ],
    sentence: { my: "ကျွန်တော် ဓာတ်ပုံ ရိုက်သည်။", en: "I take a photo." }
  },
  "န": {
    words: [
      { my: "နေရောင်", en: "sunlight" },
      { my: "နာရီ", en: "clock / hour" },
      { my: "နို့", en: "milk" },
      { my: "နံနက်", en: "morning" }
    ],
    sentence: { my: "နံနက်တွင် နေရောင် ထွက်သည်။", en: "Sunlight appears in the morning." }
  },
  "ပ": {
    words: [
      { my: "ပန်း", en: "flower" },
      { my: "ပညာ", en: "education" },
      { my: "ပင်လယ်", en: "sea" },
      { my: "ပိုက်ဆံ", en: "money" }
    ],
    sentence: { my: "ပညာသည် ဘဝအတွက် အရေးကြီးသည်။", en: "Education is important for life." }
  },
  "ဖ": {
    words: [
      { my: "ဖုန်း", en: "phone" },
      { my: "ဖိနပ်", en: "shoes" },
      { my: "ဖရဲသီး", en: "watermelon" },
      { my: "ဖတ်", en: "read" }
    ],
    sentence: { my: "သူသည် စာအုပ်ကို ဖတ်နေသည်။", en: "He is reading a book." }
  },
  "ဗ": {
    words: [
      { my: "ဗမာ", en: "Bamar / Burmese" },
      { my: "ဗိုလ်", en: "officer / general" },
      { my: "ဗဟုသုတ", en: "knowledge" },
      { my: "ဗုဒ္ဓ", en: "Buddha" }
    ],
    sentence: { my: "စာဖတ်ခြင်းသည် ဗဟုသုတ တိုးစေသည်။", en: "Reading increases knowledge." }
  },
  "ဘ": {
    words: [
      { my: "ဘုရား", en: "pagoda / Buddha" },
      { my: "ဘာသာ", en: "language / subject" },
      { my: "ဘဝ", en: "life" },
      { my: "ဘောလုံး", en: "football" }
    ],
    sentence: { my: "မြန်မာဘာသာကို လေ့လာပါ။", en: "Study the Myanmar language." }
  },
  "မ": {
    words: [
      { my: "မိသားစု", en: "family" },
      { my: "မေတ္တာ", en: "loving-kindness" },
      { my: "မြန်မာ", en: "Myanmar" },
      { my: "မိုး", en: "rain" }
    ],
    sentence: { my: "မိသားစုသည် ဘဝအတွက် အရေးကြီးသည်။", en: "Family is important in life." }
  },
  "ယ": {
    words: [
      { my: "ယုံကြည်မှု", en: "confidence" },
      { my: "ယနေ့", en: "today" },
      { my: "ယဉ်ကျေးမှု", en: "culture" },
      { my: "ယာဉ်", en: "vehicle" }
    ],
    sentence: { my: "မိမိကိုယ်ကို ယုံကြည်မှု ရှိပါ။", en: "Have confidence in yourself." }
  },
  "ရ": {
    words: [
      { my: "ရေ", en: "water" },
      { my: "ရောင်စုံ", en: "colorful" },
      { my: "ရတနာ", en: "jewel" },
      { my: "ရန်ကုန်", en: "Yangon" }
    ],
    sentence: { my: "ရေကို နေ့စဉ် သောက်ပါ။", en: "Drink water every day." }
  },
  "လ": {
    words: [
      { my: "လ", en: "moon / month" },
      { my: "လမ်း", en: "road" },
      { my: "လူ", en: "person" },
      { my: "လက်ရေး", en: "handwriting" }
    ],
    sentence: { my: "လက်ရေးကို နေ့စဉ် လေ့ကျင့်ပါ။", en: "Practice handwriting every day." }
  },
  "ဝ": {
    words: [
      { my: "ဝမ်းသာ", en: "happy" },
      { my: "ဝတ်စုံ", en: "clothing / suit" },
      { my: "ဝါ", en: "yellow" },
      { my: "ဝင်", en: "enter" }
    ],
    sentence: { my: "သူသည် အလွန် ဝမ်းသာသည်။", en: "He is very happy." }
  },
  "သ": {
    words: [
      { my: "သစ်ပင်", en: "tree" },
      { my: "သင်ခန်းစာ", en: "lesson" },
      { my: "သတင်း", en: "news" },
      { my: "သီချင်း", en: "song" }
    ],
    sentence: { my: "သစ်ပင်များကို ထိန်းသိမ်းပါ။", en: "Protect the trees." }
  },
  "ဟ": {
    words: [
      { my: "ဟင်း", en: "curry / dish" },
      { my: "ဟိုတယ်", en: "hotel" },
      { my: "ဟာသ", en: "comedy" },
      { my: "ဟုတ်ကဲ့", en: "yes" }
    ],
    sentence: { my: "ဟာသဇာတ်လမ်းသည် ရယ်စရာကောင်းသည်။", en: "The comedy story is funny." }
  },
  "ဠ": {
    words: [
      { my: "ဠင်း", en: "rare word form" },
      { my: "ဠသည်", en: "la letter form" },
      { my: "ဠာ", en: "letter example" }
    ],
    sentence: { my: "ဠ သည် အသုံးနည်းသော ဗျည်းတစ်လုံး ဖြစ်သည်။", en: "La is a less commonly used consonant." }
  },
  "အ": {
    words: [
      { my: "အိမ်", en: "house" },
      { my: "အမေ", en: "mother" },
      { my: "အလုပ်", en: "work" },
      { my: "အချစ်", en: "love" }
    ],
    sentence: { my: "အမေသည် အိမ်တွင် ရှိသည်။", en: "Mother is at home." }
  }
};
