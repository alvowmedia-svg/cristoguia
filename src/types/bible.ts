export type Testament = 'antigo' | 'novo';

export type BookCategory = 
  | 'pentateuco'
  | 'historicos'
  | 'poeticos'
  | 'profetas_maiores'
  | 'profetas_menores'
  | 'evangelhos'
  | 'historico_nt'
  | 'epistolas_paulinas'
  | 'epistolas_gerais'
  | 'revelacao';

export interface BibleBookInfo {
  id: string;
  name: string;
  abbrev: string;
  testament: Testament;
  category: BookCategory;
  categoryName: string;
  totalChapters: number;
  testamentOrder: number;
  description: string;
}

export interface BibleVerse {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  version?: string;
}

export interface ChapterData {
  bookId: string;
  bookName: string;
  chapter: number;
  verses: {
    verse: number;
    text: string;
  }[];
}

export interface DailyVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
  reference: string;
  theologicalContext: string;
  exegesis: string;
  practicalApplication: string;
  prayer: string;
  theme: string;
}

export interface HighlightedVerse {
  id: string; // `${bookId}-${chapter}-${verse}`
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  color: 'gold' | 'olive';
  note?: string;
  createdAt: string;
}

export interface WordSearchWord {
  term: string;
  display?: string;
  definition: string;
  reference: string;
}

export interface WordSearchTheme {
  id: string;
  title: string;
  subtitle: string;
  words: WordSearchWord[];
}

export interface QuizQuestion {
  id: string;
  level: 'neofito' | 'discipulo' | 'mestre';
  question: string;
  options: string[];
  correctIndex: number;
  theologicalRationale: string;
  biblicalProof: string;
  passageRef: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string[];
  pullQuote?: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  author: {
    name: string;
    title: string;
    avatarInitials: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  sections: ArticleSection[];
  relatedPassages: {
    bookId: string;
    bookName: string;
    chapter: number;
    verse: number;
    label: string;
  }[];
  tags: string[];
}
