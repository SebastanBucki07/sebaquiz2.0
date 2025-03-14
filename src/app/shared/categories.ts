export type Category = 
  'Fragmenty ksiażek' |
  'Fragmenty piosenek' |
  'Wypisz kraje lub stolice' | 
  'Klubowa Historia' |
  'Klubowe herby' |
  'Filmy - opis' | 
  'Seriale - opis' | 
  'Gra - opis' |
  'Miasto - Województwo' |
  'Stadiony świata' | 
  'Przysłowia' |
  'Historia' |
  'Rozpoznaj osobe ze zdjęcia' | 
  'Rozpoznaj budowle ze zdjęcia' | 
  'W jakim filmie zagrała taka obsada?' |
  'W jakim serialu zagrała taka obsada?' |
  'Jaka to melodia?' |
  'Czołówka serialu' |
  'Pierwiastki' |
  'Biologia' | 
  'Bogowie' | 
  'Rozpoznaj artystę po tytułach piosenek' |
  'Państwo po miastach' |
  'Rozpoznaj film po bohaterach' |
  'Rozpoznaj serial po bohaterach' |
  'Reżyser po filmach' |
  'Rozpoznaj impreze po piosence' |
  'Zawodnik klub reprezentacja' |
  'Pytanie wielokrotnego wyboru' |
  'Z jakiego kraju jest ta flaga?' |
  'Stolice krajów?' |
  'Familiada' |
  'Był taki mecz' |
  'Wypisywanie róznych wspólnych' |
  'Wypisywanie róznych wspólnych - piłka nożna' |
  'Piłkarskie kółko i krzyżyk' |
  'Aktorskie kółko i krzyżyk' |
  'Jakie to logo?';

export interface CategoryWithPoints {
  name: Category;
  points: number;
}

const naukaCategories: CategoryWithPoints[] = [
  { name: 'Fragmenty ksiażek', points: 10 },
  { name: 'Historia', points: 109 },
  { name: 'Pierwiastki', points: 70 },
  { name: 'Biologia', points: 80 },
  { name: 'Bogowie', points: 90 }
];

const muzykaCategories: CategoryWithPoints[] = [
  { name: 'Fragmenty piosenek', points: 100 },
  { name: 'Jaka to melodia?', points: 50 },
  { name: 'Rozpoznaj artystę po tytułach piosenek', points: 100 }
];

const filmCategories: CategoryWithPoints[] = [
  { name: 'Filmy - opis', points: 50 },
  { name: 'Seriale - opis', points: 60 },
  { name: 'Czołówka serialu', points: 60 },
  { name: 'Reżyser po filmach', points: 70 },
  { name: 'Rozpoznaj film po bohaterach', points: 90 },
  { name: 'Rozpoznaj serial po bohaterach', points: 80 },
  { name: 'Aktorskie kółko i krzyżyk', points: 55 },
  { name: 'W jakim filmie zagrała taka obsada?', points: 30 },
  { name: 'W jakim serialu zagrała taka obsada?', points: 40 }
];

const sportCategories: CategoryWithPoints[] = [
  { name: 'Klubowa Historia', points: 30 },
  { name: 'Klubowe herby', points: 40 },
  { name: 'Rozpoznaj impreze po piosence', points: 60 },
  { name: 'Zawodnik klub reprezentacja', points: 50 },
  { name: 'Piłkarskie kółko i krzyżyk', points: 45 },
  { name: 'Wypisywanie róznych wspólnych - piłka nożna', points: 35 },
  { name: 'Stadiony świata', points: 80 },
  { name: 'Był taki mecz', points: 25 }
];

const geografiaCategories: CategoryWithPoints[] = [
  { name: 'Wypisz kraje lub stolice', points: 20 },
  { name: 'Miasto - Województwo', points: 70 },
  { name: 'Z jakiego kraju jest ta flaga?', points: 30 },
  { name: 'Stolice krajów?', points: 20 },
  { name: 'Państwo po miastach', points: 100 }
];

const rozneCategories: CategoryWithPoints[] = [
  { name: 'Gra - opis', points: 60 },
  { name: 'Przysłowia', points: 90 },
  { name: 'Rozpoznaj osobe ze zdjęcia', points: 10 },
  { name: 'Rozpoznaj budowle ze zdjęcia', points: 20 },
  { name: 'Pytanie wielokrotnego wyboru', points: 40 },
  { name: 'Familiada', points: 15 },
  { name: 'Wypisywanie róznych wspólnych', points: 5 },
  { name: 'Jakie to logo?', points: 65 }
];

export const availableCategories: CategoryWithPoints[] = [
  ...naukaCategories,
  ...muzykaCategories,
  ...filmCategories,
  ...sportCategories,
  ...geografiaCategories,
  ...rozneCategories
];


  export function getCategoryClass(category: CategoryWithPoints) {
    return {
      'nauka': ['Fragmenty ksiażek', 'Historia', 'Pierwiastki', 'Biologia', 'Bogowie'].includes(category.name),
      'muzyka': ['Fragmenty piosenek', 'Jaka to melodia?', 'Rozpoznaj artystę po tytułach piosenek'].includes(category.name),
      'film': ['Filmy - opis', 'Seriale - opis', 'Czołówka serialu', 'Reżyser po filmach', 'Rozpoznaj film po bohaterach', 'Rozpoznaj serial po bohaterach', 'Aktorskie kółko i krzyżyk', 'W jakim filmie zagrała taka obsada?', 'W jakim serialu zagrała taka obsada?'].includes(category.name),
      'sport': ['Klubowa Historia', 'Klubowe herby', 'Rozpoznaj impreze po piosence', 'Zawodnik klub reprezentacja', 'Piłkarskie kółko i krzyżyk', 'Wypisywanie róznych wspólnych - piłka nożna', 'Stadiony świata', 'Był taki mecz'].includes(category.name),
      'geografia': ['Wypisz kraje lub stolice', 'Miasto - Województwo', 'Z jakiego kraju jest ta flaga?', 'Stolice krajów?', 'Państwo po miastach'].includes(category.name),
      'rozne': ['Gra - opis', 'Przysłowia', 'Rozpoznaj osobe ze zdjęcia', 'Rozpoznaj budowle ze zdjęcia', 'Pytanie wielokrotnego wyboru', 'Familiada', 'Wypisywanie róznych wspólnych', 'Jakie to logo?'].includes(category.name)
    };
}