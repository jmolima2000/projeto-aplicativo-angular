import { Component } from '@angular/core';

type Screen = 'start' | 'question' | 'result' | 'tips' | 'help';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  screen: Screen = 'start';
  darkMode = false;

  currentQuestion = 0;
  breathingText = 'Inspire...';

  questions = [
    { text: 'Você sente medo sem motivo claro?', category: 'Ansiedade', block: 'ansiedade' },
    { text: 'Você pensa demais e não consegue parar?', category: 'Ansiedade', block: 'ansiedade' },
    { text: 'Você sente dificuldade para relaxar?', category: 'Ansiedade', block: 'ansiedade' },
    { text: 'Você sente que algo ruim pode acontecer?', category: 'Ansiedade', block: 'ansiedade' },

    { text: 'Você se sente mentalmente cansado o tempo todo?', category: 'Sobrecarga emocional', block: 'sobrecarga' },
    { text: 'Sente que sua mente está sobrecarregada?', category: 'Sobrecarga emocional', block: 'sobrecarga' },
    { text: 'Tem dificuldade de descansar mesmo quando para?', category: 'Sobrecarga emocional', block: 'sobrecarga' },
    { text: 'Sente tensão ou irritação constante?', category: 'Sobrecarga emocional', block: 'sobrecarga' },

    { text: 'Você evita contato com outras pessoas?', category: 'Desconforto social', block: 'social' },
    { text: 'Sente dificuldade de olhar nos olhos?', category: 'Desconforto social', block: 'social' },
    { text: 'Sente desconforto em ambientes com pessoas?', category: 'Desconforto social', block: 'social' },
    { text: 'Prefere ficar isolado mesmo querendo sair?', category: 'Desconforto social', block: 'social' },

    { text: 'Sua mente parece confusa ou desorganizada?', category: 'Confusão mental', block: 'confusao' },
    { text: 'Você tem dificuldade de concentração?', category: 'Confusão mental', block: 'confusao' },
    { text: 'Esquece coisas com facilidade?', category: 'Confusão mental', block: 'confusao' },
    { text: 'Sente que não é mais como antes?', category: 'Confusão mental', block: 'confusao' },

    { text: 'Você tem dificuldade para dormir?', category: 'Sono', block: 'sono' },
    { text: 'Acorda cansado mesmo dormindo?', category: 'Sono', block: 'sono' },
    { text: 'Acorda várias vezes durante a noite?', category: 'Sono', block: 'sono' },
    { text: 'Sente que seu sono não descansa?', category: 'Sono', block: 'sono' },

    { text: 'Você se sente desanimado com frequência?', category: 'Humor', block: 'humor' },
    { text: 'Perdeu interesse em coisas que gostava?', category: 'Humor', block: 'humor' },
    { text: 'Sente falta de energia para tarefas simples?', category: 'Humor', block: 'humor' },
    { text: 'Sente tristeza constante sem motivo claro?', category: 'Humor', block: 'humor' }
  ];

  scores: any = {
    ansiedade: 0,
    sobrecarga: 0,
    social: 0,
    confusao: 0,
    sono: 0,
    humor: 0
  };

  areaMeta: any = {
    ansiedade: { title: 'Ansiedade', icon: '💭' },
    sobrecarga: { title: 'Sobrecarga emocional', icon: '🔥' },
    social: { title: 'Desconforto social', icon: '👥' },
    confusao: { title: 'Confusão mental', icon: '🧩' },
    sono: { title: 'Sono', icon: '😴' },
    humor: { title: 'Humor', icon: '😔' }
  };

  recommendationsByArea: any = {
    ansiedade: [
      'Faça uma pausa curta e respire lentamente por alguns ciclos.',
      'Reduza estímulos por alguns minutos: tela, barulho e excesso de informação.',
      'Tente focar em uma coisa concreta do presente.'
    ],
    sobrecarga: [
      'Escolha apenas uma pequena tarefa para fazer agora.',
      'Permita uma pausa real, mesmo que curta.',
      'Escreva o que está ocupando sua mente.'
    ],
    social: [
      'Comece por um contato pequeno e seguro.',
      'Procure ambientes ou pessoas que transmitam mais confiança.',
      'Respeite seu ritmo, mas tente não se isolar completamente.'
    ],
    confusao: [
      'Anote em tópicos o que você está sentindo.',
      'Organize uma coisa por vez.',
      'Diminua excesso de informação.'
    ],
    sono: [
      'Crie um período mais calmo antes de dormir.',
      'Evite tentar resolver problemas mentalmente na hora de deitar.',
      'Observe se seu descanso está sendo suficiente.'
    ],
    humor: [
      'Escolha uma atividade simples.',
      'Tente se aproximar aos poucos de algo que antes te fazia bem.',
      'Converse com alguém de confiança.'
    ]
  };

  areas: any[] = [];
  relevantAreas: any[] = [];
  combinationTips: any[] = [];
  actionPlan: string[] = [];

  emotionalState = {
    title: '',
    description: ''
  };

  resultIntro = '';
  mainAreaName = '';
  mainAreaText = '';
  welcomeMessage = '';
  resultExplanation = '';

  get currentQuestionData() {
    return this.questions[this.currentQuestion];
  }

  get progressPercent() {
    if (this.screen === 'result') return 100;
    return ((this.currentQuestion + 1) / this.questions.length) * 100;
  }

  get progressLabel() {
    if (this.screen === 'start') return 'Boas-vindas';
    if (this.screen === 'result') return 'Resultado';
    if (this.screen === 'question') return `Pergunta ${this.currentQuestion + 1}`;
    return 'Apoio';
  }

  get progressCount() {
    if (this.screen === 'start') return `0/${this.questions.length}`;
    if (this.screen === 'result') return `${this.questions.length}/${this.questions.length}`;
    return `${this.currentQuestion + 1}/${this.questions.length}`;
  }

  startQuiz() {
    this.currentQuestion = 0;
    Object.keys(this.scores).forEach(key => this.scores[key] = 0);
    this.screen = 'question';
  }

  answer(value: number) {
    const block = this.currentQuestionData.block;
    this.scores[block] += value;

    this.currentQuestion++;

    if (this.currentQuestion < this.questions.length) {
      this.screen = 'question';
    } else {
      this.renderResults();
      this.screen = 'result';
    }
  }

  classify(score: number) {
    if (score <= 2) return 'leve';
    if (score <= 5) return 'moderado';
    return 'alto';
  }

  getAreas() {
    return Object.keys(this.scores).map(key => ({
      key,
      title: this.areaMeta[key].title,
      icon: this.areaMeta[key].icon,
      score: this.scores[key],
      level: this.classify(this.scores[key])
    }));
  }

  getMainArea(areas: any[]) {
    return [...areas].sort((a, b) => b.score - a.score)[0];
  }

  getRelevantAreas(areas: any[]) {
    const importantAreas = areas.filter(area => area.level === 'moderado' || area.level === 'alto');

    if (importantAreas.length > 0) {
      return importantAreas.sort((a, b) => b.score - a.score);
    }

    return areas.filter(area => area.score > 0).sort((a, b) => b.score - a.score);
  }

  renderResults() {
    this.areas = this.getAreas();

    const mainArea = this.getMainArea(this.areas);
    this.relevantAreas = this.getRelevantAreas(this.areas);

    const areasWithScore = this.areas.filter(area => area.score > 0);

    this.resultIntro = areasWithScore.length === 0
      ? 'No momento, suas respostas indicam poucos sinais relevantes nas áreas avaliadas.'
      : `Você apresentou sinais relacionados a: ${areasWithScore.map(area => `${area.title} (${area.level})`).join(', ')}.`;

    this.emotionalState = this.getEmotionalState();

    this.mainAreaName = this.relevantAreas.length > 1
      ? this.relevantAreas.map(area => `${area.icon} ${area.title} (${area.level})`).join(' + ')
      : `${mainArea.icon} ${mainArea.title} (${mainArea.level})`;

    this.mainAreaText = this.generateMainAreaText(this.relevantAreas, mainArea);
    this.actionPlan = this.getActionPlan();
    this.combinationTips = this.getCombinationRecommendations();

    this.welcomeMessage = mainArea.score === 0
      ? 'Que bom que, neste momento, os sinais parecem baixos. Mesmo assim, cuidar da mente não precisa acontecer apenas quando tudo está difícil.'
      : 'Você não precisa resolver tudo agora. Entender o que está acontecendo já é um passo importante.';

    this.resultExplanation = this.generateExplanation(this.areas);
  }

  getEmotionalState() {
    const { ansiedade, sobrecarga, social, confusao, sono, humor } = this.scores;

    if (ansiedade >= 6 && sono >= 5) {
      return {
        title: 'Mente em alerta constante',
        description: 'Sua mente pode estar em estado de alerta, enquanto seu descanso também parece afetado.'
      };
    }

    if (sobrecarga >= 6 && confusao >= 5) {
      return {
        title: 'Sobrecarga cognitiva',
        description: 'Seu resultado sugere excesso de carga mental, podendo afetar concentração e clareza.'
      };
    }

    if (sobrecarga >= 6 && humor >= 5) {
      return {
        title: 'Cansaço emocional acumulado',
        description: 'Seu resultado indica sinais de esgotamento emocional junto com queda de ânimo.'
      };
    }

    if (social >= 6 && ansiedade >= 5) {
      return {
        title: 'Sensibilidade social com alerta',
        description: 'Seu resultado sugere desconforto em interações sociais combinado com preocupação.'
      };
    }

    if (humor >= 6 && sono >= 5) {
      return {
        title: 'Baixa energia emocional',
        description: 'Sono e humor podem estar influenciando sua disposição.'
      };
    }

    if (ansiedade >= 6) {
      return {
        title: 'Mente em alerta',
        description: 'Sua mente parece estar mais preocupada ou antecipando problemas.'
      };
    }

    return {
      title: 'Sinais leves no momento',
      description: 'Seu resultado indica sinais mais leves nas áreas avaliadas.'
    };
  }

  getCombinationRecommendations() {
    const extras = [];

    if (this.scores.ansiedade >= 6 && this.scores.sono >= 5) {
      extras.push({
        title: 'Ansiedade + Sono',
        text: 'Priorize desaceleração antes de dormir.'
      });
    }

    if (this.scores.sobrecarga >= 6 && this.scores.confusao >= 5) {
      extras.push({
        title: 'Sobrecarga + Confusão mental',
        text: 'Reduza demandas e organize uma coisa por vez.'
      });
    }

    if (this.scores.social >= 6 && this.scores.ansiedade >= 5) {
      extras.push({
        title: 'Desconforto social + Ansiedade',
        text: 'Comece por contatos pequenos e ambientes mais seguros.'
      });
    }

    return extras;
  }

  getActionPlan() {
    const plan = [
      'Pare por 1 minuto e observe como seu corpo está agora.',
      'Respire devagar por alguns ciclos.',
      'Escreva em uma frase o que mais está pesando neste momento.',
      'Escolha apenas uma pequena ação possível para fazer depois.'
    ];

    if (this.scores.sono >= 5) {
      plan.push('Hoje, tente criar um momento mais calmo antes de dormir.');
    }

    if (this.scores.social >= 5) {
      plan.push('Procure uma interação pequena e segura.');
    }

    if (this.scores.humor >= 5) {
      plan.push('Tente fazer uma atividade simples.');
    }

    return plan.slice(0, 6);
  }

  generateExplanation(areas: any[]) {
    const highCount = areas.filter(item => item.level === 'alto').length;
    const moderateCount = areas.filter(item => item.level === 'moderado').length;

    if (highCount >= 2) {
      return 'Isso pode indicar um período de sobrecarga importante em mais de uma área.';
    }

    if (highCount === 1 || moderateCount >= 2) {
      return 'Isso pode indicar um período de estresse emocional e mental.';
    }

    return 'Você apresentou sinais mais leves neste momento.';
  }

  generateMainAreaText(relevantAreas: any[], mainArea: any) {
    if (relevantAreas.length > 1) {
      const list = relevantAreas.map(area => `${area.title} (${area.level})`).join(', ');
      return `Mais de uma área merece atenção neste momento: ${list}.`;
    }

    return `Essa área teve maior pontuação e pode merecer mais atenção agora.`;
  }

  openTips() {
    this.screen = 'tips';
    this.startBreathingText();
  }

  startBreathingText() {
    const phases = ['Inspire...', 'Segure...', 'Expire lentamente...'];
    let i = 0;

    setInterval(() => {
      this.breathingText = phases[i];
      i = (i + 1) % phases.length;
    }, 2666);
  }

  toggleZenMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode');
  }

  resetQuiz() {
    this.currentQuestion = 0;
    Object.keys(this.scores).forEach(key => this.scores[key] = 0);
    this.screen = 'start';
  }
}