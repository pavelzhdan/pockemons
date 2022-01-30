/**
 * Объект с информацией о покемоне для сравнения
 */

export type PokemonComparisonObject = {
  /** Уникальный номер * */
  id: number;
  /** Имя покемона * */
  pokemonName: string;
  /** Изображение покемона * */
  image: string;
  /** Показатель здоровья * */
  hp: number;
  /** Показатель урона * */
  attack: number;
  /** Показатель защиты * */
  defence: number;
  /** Показатель специальной атаки * */
  specialAttack: number;
  /** Показатель специальной защиты * */
  specialDefence: number;
  /** Показатель скорости * */
  speed: number;
  /** Рост покемона * */
  height: number;
  /** Вес покемона * */
  weight: number;
  /** Способности покемона * */
  abilities: { ability: { name: string } }[];
  /** URL для запроса данных по покемону по API * */
  url: string;
};

/**
 * Объект с информацией о покемоне для индивидуальной страницы
 */

export type PokemonIndividualPageObject = {
  /** Уникальный номер * */
  id: number;
  /** Имя покемона * */
  name: string;
  /** Ссылка на изображение * */
  image: string;
  types: { type: { name: string; url: string } }[];
  stats: { ['base_stat']: number; stat: { name: string; url: string } }[];
  abilities: { ability: { name: string; url: string } }[];
};

/**
 * Стейт индивидуальной страницы покемона
 */
export type PokemonPageState = {
  /** URL покемона для запроса данных по API * */
  currentUrl: string;
  /** Полученные данные о покемоне * */
  currentPokemon: PokemonIndividualPageObject;
  /** Названия и описание специальных возможностей покемонов * */
  abilities: { name: string; description: string }[];
};

/**
 * Параметр и его описание
 */
export type ItemDescription = {
  /** Название параметра * */
  name: string;
  /** Описание параметра или его значение * */
  description: string;
};

/**
 * Пармаетр и URL для API
 */
export type ItemApi = {
  /** Название параметра * */
  name: string;
  /** Ссылка для запроса данных по API * */
  url: string;
};

/**
 * Стейт для пагинации и отображения покемонов
 */
export type PokemonPaginationState = {
  /** Перечень покемонов которые должны быть отображены на текущей странице * */
  items: { name: string; url: string }[];
  /** Полный перечень покемонов: имя покемона и URL для запроса данных по API * */
  allItems: { name: string; url: string }[];
  /** Перечень покемонов, которые будут отображены: имя покемона и URL для запроса данных по API * */
  itemsToShow: { name: string; url: string }[];
  /** Перечень покемонов, которые отфильтровали: имя покемона и URL для запроса данных по API * */
  filteredItems: { name: string; url: string }[];
  /** Есть ли что отображать по поисковому запросу * */
  searchFailed: boolean;
  /** Данные покемонов, добавленные для сравнения * */
  comparisonItems: PokemonComparisonObject[];
  /** Общее количество покемонов * */
  totalQuantity: number;
  /** количество отображаемых покемонов на страние для запроса по API * */
  itemsPerPage: string;
  /** отступ от начала списка покемонов для запроса по API* */
  itemsOffset: string;
  /** URL для запроса следующей страницы покемонов* */
  nextUrl: string | null;
  /** URL для запроса предыдущей страницы покемонов* */
  previousUrl: string | null;
  /** была ли уже загрузка всех покемонов* */
  isInitial: boolean;
  /** покемоны (имя и адрес для запроса информации по API) добавленные для сравнения* */
  addedToComparison: { name: string; url: string }[];
};

/**
 * Информация получаемая при первой загрузке данных
 */
export type InitialData = {
  /** общее количество покемонов* */
  count: number;
  /** URL для запроса покемонов для следующей страницы* */
  next: string | null;
  /** URL для запроса покемонов для предыдущей страницы* */
  previous: string | null;
  /** перечень покемонов для текущей страницы* */
  results: { name: string; url: string }[];
};
/**
 * Информация получаемая для отображения другой страницы
 */
export type ChangePageData = {
  /** URL для запроса покемонов для следующей страницы* */
  next: string | null;
  /** URL для запроса покемонов для предыдущей страницы* */
  previous: string | null;
  /** перечень покемонов для текущей страницы* */
  results: { name: string; url: string }[];
};

/**
 * Информация о покемоне для отображения на странице сравнения
 */
export type PokemonData = {
  /** Уникальный номер* */
  id: number;
  /** Имя покемона* */
  pokemonName: string;
  /** URL на изображение* */
  image: string;
  /** Показатель здоровья* */
  hp: number;
  /** Показатель атаки* */
  attack: number;
  /** Показатель защиты* */
  defence: number;
  /** Показатель специальной атаки* */
  specialAttack: number;
  /** Показатель специальной защиты* */
  specialDefence: number;
  /** Показатель скорости* */
  speed: number;
  /** Рост покемона* */
  height: number;
  /** Вес покемона* */
  weight: number;
  /** Способности покемона * */
  abilities: [];
  /** URL для запроса данных по покемону по API * */
  url: string;
};
