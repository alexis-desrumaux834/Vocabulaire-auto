export interface Vocabulary {
  word: string;
  translation: string;
  pronunciation: string;
}

export interface VocabularyFile {
  words: Array<Vocabulary>;
}

export interface VocabularyAttempt extends Vocabulary {
  count: number;
}

export interface VocabularyRow extends Vocabulary {
  key: string;
};