import { ApplicationDetails } from "@/domain/applications/application";


export type ApplicationDetailsOptionType = 'yes-or-no' | 'input' | 'textarea' | 'no-or-answer' | 'checkbox';
export type ApplicationDetailsOption = { name: keyof ApplicationDetails, type: ApplicationDetailsOptionType, label: string, defaultValue?: string | Array<OptionType> }
export type OptionType = { label: string, value: number | string };
export const applicationDetailsOptions: ApplicationDetailsOption[] = [
    {
        name: 'meals',
        type: 'checkbox',
        label: 'Tercih ettiğiniz öğünler',
        defaultValue: [{
            label: 'Kahvaltı', value: 1
        }, {
            label: 'Ara Öğün', value: 2
        }, {
            label: 'Öğlen yemeği',
            value: 3
        }, {
            label: 'Akşam yemeği',
            value: 4
        }]
    },
    {
        name: 'dislikedFoods',
        type: 'checkbox',
        label: 'Tercih etmediğiniz ürünler',
        defaultValue: [{
            label: 'Ekmek',
            value: 'ekmek'
        }, {
            label: 'Peynir',
            value: 'peynir'
        }, {
            label: 'Tatli',
            value: 'Tatli'
        }]
    },
    {
        name: 'isPregnant',
        type: 'yes-or-no',
        label: 'Hamile misiniz?'
    },
    {
        name: 'isDiabetes',
        type: 'yes-or-no',
        label: 'Diyabet hastası mısınız?'
    },
    {
        name: 'haveEverStartDiet',
        type: 'yes-or-no',
        label: 'Daha önce diyet yaptiniz mi?'
    },
    {
        name: 'whoDoesShoppingAtHome',
        type: 'input',
        label: 'Evde Besin alişverigini kim yapar?'
    },
    {
        name: 'whatKindOfDietDidYouImplement',
        type: 'textarea',
        label: 'Hangi tür diyetler ve ne kadar uyguladiniz?'
    },
    {
        name: 'doesTakeSweetener',
        type: 'yes-or-no',
        label: 'Diyet ürünü tadlandiric kullaniyor musunuz?'
    },
    {
        name: 'whenDidTakeGainWeight',
        type: 'input',
        label: 'Ne zaman kilo almaya bagladiniz?'
    },
    {
        name: 'whenDidStartFasting',
        type: 'input',
        label: 'Ne zamandan beri kilo vermek istiyorsunuz?'
    },
    {
        name: 'whyDidNotLosingWeight',
        type: 'input',
        label: 'Sizce neden kilo veremiyor/alamiyorsunuz?'
    },
    {
        name: 'haveEverConstipation',
        type: 'yes-or-no',
        label: 'Kabizlik şikayetiniz var mi?'
    },
    {
        name: 'whatIsYourCurrentWeightTargetRange',
        type: 'input',
        label: 'Su an hedeflediginiz kilo araliginiz nedir?'
    },
    {
        name: 'doYouDoSports',
        type: 'yes-or-no',
        label: 'Spor yapiyor musunuz? musunuz ne siklikta? Hangi tür? Agik hava/ spor salonu?'
    },
    {
        name: 'whatFoodsDoYouDislike',
        type: 'yes-or-no',
        label: 'Sevmediginiz yiyecekler nelerdir?'
    },
    {
        name: 'numberOfBirthsInFemaleIndividuals',
        type: 'input',
        label: 'Kadın bireylerde dogum sayısı'
    },
    {
        name: 'lastPostpartumBodyWeight',
        type: 'input',
        label: 'Son doğum sonrası vücut ağırlığı'
    },
    {
        name: 'howManyKgDidYouGainDuringYourLastPregnancy',
        type: 'input',
        label: 'Son gebelikte kag kg aldiniz?'
    },
    {
        name: 'whatProblemsDidYouExperienceDuringYourPregnancy',
        type: 'input',
        label: 'Gebeliginizde yaşadıgınız sorunlar (gebelik, diyabeti vb.) nelerdir?'
    },
    {
        name: 'doYouHaveAnyDiseaseDiagnosedByDoctor',
        type: 'no-or-answer',
        label: 'Doktor tarafindan tanisi konulmus herhangi bir rahatsizliginiz var mi?'
    },
    {
        name: 'doYouUseAnyMinerals',
        type: 'yes-or-no',
        label: 'Kullandiginiz ilas /vitamin / mineral var mi?'
    },
    {
        name: 'areThereAnyMedicationsYouUseRegularly',
        type: 'no-or-answer',
        label: 'Sürekli kullandiginiz ilaçlar var mi varsa neler?'
    },
    {
        name: 'historyOfUseOfAnyMedicationMethodForWeightLossBefore',
        type: 'no-or-answer',
        label: "Daha önce zayiflama nedeniyle ilag/bitkisel ürün/yöntem var mi varsa kullanim öyküsü:"
    },
    {
        name: 'doYouHaveHistoryOfFood',
        type: 'no-or-answer',
        label: 'Besin alerjisi /intoleransi öykünüz var mi? Besin adi:'
    },
    {
        name: 'howOftenAndWhatKindOfFoodDoYouConsumeOutsideTheHome',
        type: 'input',
        label: 'Ev disinda ne siklikla ve ne tür besin tüketirsiniz?'
    },
    {
        name: 'doYouHaveTheHabitOfWakingUpAtNightAndEating',
        type: 'yes-or-no',
        label: 'Gece uykudan uyanip yemek yeme aligkanliginiz var midir?'
    },
    {
        name: 'doYouHaveHabitOfBingeEating',
        type: 'yes-or-no',
        label: 'Tikinircasina yemek yeme (bir defada asiri miktarda besin tüketme) aliskanliginiz var midir?'
    },
    {
        name: 'haveSleepPattern',
        type: 'yes-or-no',
        label: 'Uyku Düzeniniz'
    },
    {
        name: 'describeDay',
        type: 'textarea',
        label: '1 gün boyunca neler yediginizi saatleri ve miktarlar ile birlikte yazar misiniz?'
    },
    {
        name: 'youCanWriteAnyInformationYouWantToSendUsHere',
        type: 'textarea',
        label: 'Bize iletmek istediginiz her türlü bilgiyi buraya yazabilirsiniz'
    }
];
