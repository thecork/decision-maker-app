import React, { useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, spacing } from './src/theme';
import {
  type DecisionOption,
  chooseInitialPair,
  detectCategory,
  generateNextPair,
  getCategoryLabel,
  getOptionsForCategory,
} from './src/utils/decisionEngine';

const DEFAULT_PROMPT = 'recipe ideas using chicken';

export default function App() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [category, setCategory] = useState('recipe');
  const [currentPair, setCurrentPair] = useState<DecisionOption[]>(() =>
    chooseInitialPair(DEFAULT_PROMPT),
  );
  const [history, setHistory] = useState<string[]>([]);
  const [finalChoice, setFinalChoice] = useState<DecisionOption | null>(null);

  const canGenerate = prompt.trim().length > 0;

  const promptHint = useMemo(() => {
    if (!prompt.trim()) {
      return 'Type a category or preference to begin.';
    }

    return `Category: ${getCategoryLabel(detectCategory(prompt))}`;
  }, [prompt]);

  const handleGenerate = () => {
    const detectedCategory = detectCategory(prompt);
    const pair = chooseInitialPair(prompt, detectedCategory);

    setCategory(detectedCategory);
    setCurrentPair(pair);
    setHistory([]);
    setFinalChoice(null);
  };

  const handleChoose = (option: DecisionOption, isFinal: boolean) => {
    if (isFinal) {
      setFinalChoice(option);
      return;
    }

    const nextPair = generateNextPair(option, category, history);
    setCurrentPair(nextPair);
    setHistory((prev) => [...new Set([...prev, option.id])]);
  };

  const resetApp = () => {
    setPrompt(DEFAULT_PROMPT);
    setCategory('recipe');
    setCurrentPair(chooseInitialPair(DEFAULT_PROMPT));
    setHistory([]);
    setFinalChoice(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerCard}>
          <Text style={styles.eyebrow}>Decision Maker</Text>
          <Text style={styles.title}>Find the choice that feels right</Text>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.sectionLabel}>What do you want help deciding?</Text>
          <TextInput
            value={prompt}
            onChangeText={setPrompt}
            style={styles.input}
            placeholder="recipe ideas using chicken"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.hint}>{promptHint}</Text>

          <TouchableOpacity
            style={[styles.primaryButton, !canGenerate && styles.disabledButton]}
            onPress={handleGenerate}
            disabled={!canGenerate}
          >
            <Text style={styles.primaryButtonText}>Generate options</Text>
          </TouchableOpacity>
        </View>

        {finalChoice ? (
          <View style={styles.finalCard}>
            <Text style={styles.sectionLabel}>Your final pick</Text>
            <Text style={styles.finalTitle}>{finalChoice.name}</Text>
            <Text style={styles.finalDescription}>{finalChoice.description}</Text>

            {finalChoice.image ? (
              <Image source={{ uri: finalChoice.image }} style={styles.optionImageLarge} resizeMode="cover" />
            ) : null}

            <TouchableOpacity style={styles.secondaryButton} onPress={resetApp}>
              <Text style={styles.secondaryButtonText}>Start over</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionLabel}>Pick your preferred option</Text>

            <View style={styles.optionGrid}>
              {currentPair.map((option) => (
                <View key={option.id} style={styles.optionCard}>
                  {option.image ? (
                    <Image source={{ uri: option.image }} style={styles.optionImage} resizeMode="cover" />
                  ) : null}

                  <View style={styles.optionBody}>
                    <Text style={styles.optionTitle}>{option.name}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>

                    <View style={styles.tagRow}>
                      {option.tags.slice(0, 3).map((tag) => (
                        <View key={`${option.id}-${tag}`} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.chooseButton} onPress={() => handleChoose(option, false)}>
                      <Text style={styles.chooseButtonText}>Choose this</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.finalButton} onPress={() => handleChoose(option, true)}>
                      <Text style={styles.finalButtonText}>Final pick</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Current category</Text>
              <Text style={styles.summaryText}>{getCategoryLabel(category)}</Text>
              <Text style={styles.summaryMeta}>Selections tracked: {history.length}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.l,
    paddingBottom: spacing.xl,
  },
  headerCard: {
    marginBottom: spacing.l,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    letterSpacing: 1.4,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    color: colors.text,
    fontWeight: '800',
  },
  promptCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: spacing.l,
    marginBottom: spacing.l,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionLabel: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 16,
  },
  hint: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 10,
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
  optionGrid: {
    gap: spacing.m,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  optionImage: {
    width: '100%',
    height: 180,
    backgroundColor: colors.input,
  },
  optionImageLarge: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginTop: 14,
    marginBottom: 12,
    backgroundColor: colors.input,
  },
  optionBody: {
    padding: spacing.m,
  },
  optionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  optionDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    gap: 8,
  },
  tag: {
    backgroundColor: colors.tag,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.m,
  },
  chooseButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  chooseButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  finalButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  finalButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.m,
    marginTop: spacing.l,
  },
  summaryTitle: {
    color: colors.muted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  summaryText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  summaryMeta: {
    color: colors.muted,
    marginTop: 8,
  },
  finalCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.l,
  },
  finalTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  finalDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  secondaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 18,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
});
