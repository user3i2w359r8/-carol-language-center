/* Edit this course list, then run: node build-site.mjs
   Add a new object with a unique slug and complete English/Arabic copy to add a course. */
module.exports = [
  {
    slug: 'german', code: 'DE', native: 'Deutsch', greeting: 'Hallo.', greetingLang: 'de',
    en: {
      name: 'German', title: 'German lessons in Tripoli | Carol for Language Courses',
      description: 'Explore German lessons at Carol for Language Courses in Tripoli, Lebanon. Tell us your learning goals, ask about the course and find the center.',
      short: 'A new language. A new way to connect.',
      headline: 'Your next chapter,\nin German.',
      intro: 'Discover German at Carol for Language Courses in Tripoli. Whether you are meeting the language for the first time or returning to it, start by telling us what you want to do with it.',
      sectionTitle: 'Give your German a purpose.',
      paragraphs: ['Learning a language becomes more personal when you know why it matters to you. You might want to introduce yourself, understand an everyday conversation or feel more at ease when travelling.', 'Before choosing a course, think about your starting point. Have you studied German before? What do you already feel comfortable doing? Share that with Carol so you can ask about the most suitable next step.'],
      goals: [
        ['Everyday conversations', 'Think about the moments you want to handle: introducing yourself, asking a question or getting to know someone.'],
        ['Study and work interests', 'Tell us if your interest in German connects to your studies or work, so your enquiry starts with the context that matters to you.'],
        ['Travel and connection', 'A little familiarity with a language can make a place feel less unfamiliar. Let us know what you would like to understand or express.']
      ],
      question: 'What should I mention when asking about German?',
      answer: 'Tell us whether you have studied German before and what you want to use it for. You can also mention the days that usually work for you. Carol can then explain the course options currently available.',
      message: 'Hello Carol! I am interested in German lessons. Could you tell me about the available course options?'
    },
    ar: {
      name: 'الألمانية', title: 'دورات ألمانية في طرابلس | كارول لتعليم اللغات',
      description: 'تعرّف على دورات الألمانية في كارول لتعليم اللغات بطرابلس، لبنان. احكِ لنا عن هدفك، اسأل عن الدورة واعرف كيف تصل إلى المركز.',
      short: 'لغة جديدة، وطريقة جديدة للتواصل.',
      headline: 'افتح صفحة جديدة،\nبالألمانية.',
      intro: 'تعرّف على الألمانية في كارول لتعليم اللغات بطرابلس. سواء كانت هذه بدايتك مع اللغة أو كنت ترجع إليها بعد فترة، احكِ لنا أولاً عمّا تريد أن تحقّقه من تعلّمها.',
      sectionTitle: 'خلّي لتعلّم الألمانية هدفاً يخصّك.',
      paragraphs: ['يصبح تعلّم اللغة أقرب إليك عندما تعرف لماذا تريدها. قد يكون هدفك أن تعرّف عن نفسك، أو تفهم حديثاً يومياً، أو تشعر براحة أكبر خلال السفر.', 'قبل اختيار الدورة، فكّر بنقطة البداية: هل درست الألمانية من قبل؟ وما الذي تشعر أنّك تستطيع فعله بها اليوم؟ شاركنا هذه التفاصيل لنسأل معاً عن الخطوة الأنسب لك.'],
      goals: [
        ['المحادثات اليومية', 'فكّر بالمواقف التي تريد أن تتواصل فيها: التعريف عن نفسك، طرح سؤال أو التعرّف إلى شخص جديد.'],
        ['اهتمامات الدراسة والعمل', 'إذا كان اهتمامك بالألمانية مرتبطاً بدراستك أو عملك، أخبرنا عن ذلك حتى يكون سؤالك عن الدورة واضحاً من البداية.'],
        ['السفر والتواصل', 'التعرّف إلى لغة بلد ما يجعل التجربة أقرب إليك. احكِ لنا عمّا تودّ فهمه أو التعبير عنه.']
      ],
      question: 'ماذا أذكر عندما أسأل عن دورة الألمانية؟',
      answer: 'أخبرنا إن كنت قد درست الألمانية من قبل، ولماذا تريد تعلّمها. يمكنك أيضاً ذكر الأيام التي تناسبك عادةً. بعدها يوضّح لك المركز خيارات الدورات المتاحة.',
      message: 'مرحباً كارول! أنا مهتم/ة بدورة اللغة الألمانية. ممكن أعرف ما هي الخيارات المتاحة؟'
    }
  },
  {
    slug: 'english', code: 'EN', native: 'English', greeting: 'Hello.', greetingLang: 'en',
    en: {
      name: 'English', title: 'English lessons in Tripoli | Carol for Language Courses',
      description: 'Find English lessons at Carol for Language Courses in Tripoli, Lebanon. Share your goals for English and contact the center directly on WhatsApp.',
      short: 'Find the words for your everyday world.',
      headline: 'More to say.\nMore in English.',
      intro: 'Explore English at Carol for Language Courses in Tripoli. Bring your reason for learning, whether it is a daily conversation, an interest in your studies or feeling more comfortable expressing yourself.',
      sectionTitle: 'Start with the English you want to use.',
      paragraphs: ['English can be part of a message, a conversation, something you read or a new person you meet. Think about the situations in which you would most like to feel comfortable using it.', 'Your starting point is useful information. You may already understand some English but hesitate to speak, or you may be returning after time away. Tell Carol about your experience when asking which course options are available.'],
      goals: [
        ['Expressing yourself', 'Consider what you want to say about your day, your interests or your plans, and where you tend to get stuck.'],
        ['Reading and understanding', 'Tell us about the English you encounter, whether in your studies, at work or in the things you enjoy reading.'],
        ['Connecting with others', 'Think of the conversations you want to join and the people you would like to communicate with more comfortably.']
      ],
      question: 'I understand some English but hesitate to speak. What should I ask?',
      answer: 'Mention that when you contact Carol. Explain what you already understand and the situations in which speaking feels difficult. Ask which available course options match your starting point and goal.',
      message: 'Hello Carol! I am interested in English lessons. Could you tell me about the available course options?'
    },
    ar: {
      name: 'الإنكليزية', title: 'دورات إنكليزي في طرابلس | كارول لتعليم اللغات',
      description: 'تعرّف على دورات الإنكليزية في كارول لتعليم اللغات بطرابلس، لبنان. شاركنا هدفك من التعلّم وتواصل مباشرةً مع المركز عبر واتساب.',
      short: 'كلمات أقرب إلى حياتك اليومية.',
      headline: 'عندك الكثير لتحكيه.\nاحكِه بالإنكليزية.',
      intro: 'تعرّف على الإنكليزية في كارول لتعليم اللغات بطرابلس. ابدأ بالسبب الذي يدفعك لتعلّمها، من حديث يومي إلى اهتمام دراسي أو رغبة في التعبير عن نفسك براحة أكبر.',
      sectionTitle: 'ابدأ بالإنكليزية التي تحتاجها في حياتك.',
      paragraphs: ['قد تصادف الإنكليزية في رسالة، أو محادثة، أو نصّ تقرأه، أو عند التعرّف إلى شخص جديد. فكّر بالمواقف التي تتمنّى أن تستخدم فيها اللغة براحة أكبر.', 'من المفيد أن توضّح نقطة بدايتك. ربما تفهم بعض الإنكليزية لكنّك تتردّد في الكلام، أو ترغب في العودة إلى التعلّم بعد انقطاع. أخبر كارول عن تجربتك عندما تسأل عن خيارات الدورات.'],
      goals: [
        ['التعبير عن نفسك', 'فكّر بما تريد قوله عن يومك واهتماماتك وخططك، وبالمواقف التي يصعب عليك فيها إيجاد الكلمات.'],
        ['القراءة والفهم', 'احكِ لنا عن الإنكليزية التي تصادفها في الدراسة أو العمل أو في المواضيع التي تحبّ قراءتها.'],
        ['التواصل مع الآخرين', 'فكّر بالمحادثات التي تريد المشاركة فيها وبالأشخاص الذين تودّ التواصل معهم براحة أكبر.']
      ],
      question: 'أفهم بعض الإنكليزية لكن أتردّد في الكلام. ماذا أسأل؟',
      answer: 'اذكر ذلك عندما تتواصل مع كارول. وضّح ما تفهمه اليوم والمواقف التي تجد الكلام فيها صعباً، واسأل عن الخيارات المتاحة التي تناسب نقطة بدايتك وهدفك.',
      message: 'مرحباً كارول! أنا مهتم/ة بدورة اللغة الإنكليزية. ممكن أعرف ما هي الخيارات المتاحة؟'
    }
  },
  {
    slug: 'italian', code: 'IT', native: 'Italiano', greeting: 'Ciao.', greetingLang: 'it',
    en: {
      name: 'Italian', title: 'Italian lessons in Tripoli | Carol for Language Courses',
      description: 'Discover Italian lessons at Carol for Language Courses in Tripoli, Lebanon. Explore your reasons for learning Italian and ask the center about the course.',
      short: 'Turn a little curiosity into a conversation.',
      headline: 'Follow your curiosity.\nSay it in Italian.',
      intro: 'Discover Italian at Carol for Language Courses in Tripoli. A love of the language, an interest in culture or a future journey can all be reasons to begin the conversation.',
      sectionTitle: 'Make Italian part of your story.',
      paragraphs: ['Sometimes a language begins with something that catches your attention: a song, a film, a place or a conversation you wish you could follow. Italian gives that curiosity somewhere to go.', 'Think about what brought you to the language and whether you have studied it before. Sharing your interests helps make your first conversation with Carol more useful when you ask about the available course options.'],
      goals: [
        ['Everyday exchanges', 'Picture the simple conversations you would like to have, from greeting someone to asking about a place.'],
        ['Culture and curiosity', 'Tell us what draws you to Italian: music, film, books, food, design or simply the sound of the language.'],
        ['A journey of your own', 'If travel or a personal connection is part of your motivation, share the situations you would like to feel more comfortable in.']
      ],
      question: 'Can I ask about Italian if I have never studied it?',
      answer: 'Yes. Tell Carol that Italian is new to you and explain why you would like to learn it. Ask about the course options available for your starting point before deciding what suits you.',
      message: 'Hello Carol! I am interested in Italian lessons. Could you tell me about the available course options?'
    },
    ar: {
      name: 'الإيطالية', title: 'دورات إيطالي في طرابلس | كارول لتعليم اللغات',
      description: 'اكتشف دورات الإيطالية في كارول لتعليم اللغات بطرابلس، لبنان. احكِ لنا عن سبب اهتمامك باللغة واسأل المركز عن الدورة.',
      short: 'من فضول صغير إلى محادثة جديدة.',
      headline: 'اتبع فضولك.\nوعبّر بالإيطالية.',
      intro: 'اكتشف الإيطالية في كارول لتعليم اللغات بطرابلس. حبّ اللغة، أو الاهتمام بالثقافة، أو رحلة تحلم بها، كلّها أسباب جميلة لتبدأ الحديث معنا.',
      sectionTitle: 'اجعل الإيطالية جزءاً من قصّتك.',
      paragraphs: ['أحياناً تبدأ علاقتنا بلغة من أغنية، أو فيلم، أو مكان، أو محادثة نتمنّى أن نفهمها. تعلّم الإيطالية يمكن أن يقرّبك من هذا الفضول.', 'فكّر بما جذبك إلى اللغة، وبما إذا كنت قد درستها من قبل. مشاركة اهتماماتك تجعل حديثك الأوّل مع كارول أوضح عندما تسأل عن خيارات الدورات المتاحة.'],
      goals: [
        ['مواقف يومية', 'تخيّل الأحاديث البسيطة التي تريد أن تتمكّن منها، من إلقاء التحية إلى السؤال عن مكان.'],
        ['الثقافة والفضول', 'أخبرنا عمّا يجذبك إلى الإيطالية: الموسيقى، السينما، الكتب، الطعام، التصميم أو نغمة اللغة نفسها.'],
        ['رحلة تخصّك', 'إذا كان السفر أو التواصل مع شخص مقرّب جزءاً من دافعك، احكِ لنا عن المواقف التي تريد أن تشعر فيها براحة أكبر.']
      ],
      question: 'هل يمكنني السؤال عن الإيطالية إذا لم أدرسها من قبل؟',
      answer: 'أكيد. أخبر كارول أنّ اللغة جديدة بالنسبة لك، ولماذا تريد تعلّمها. اسأل عن الخيارات المتاحة التي تناسب نقطة بدايتك قبل اختيار ما يلائمك.',
      message: 'مرحباً كارول! أنا مهتم/ة بدورة اللغة الإيطالية. ممكن أعرف ما هي الخيارات المتاحة؟'
    }
  },
  {
    slug: 'spanish', code: 'ES', native: 'Español', greeting: 'Hola.', greetingLang: 'es',
    en: {
      name: 'Spanish', title: 'Spanish lessons in Tripoli | Carol for Language Courses',
      description: 'Explore Spanish lessons at Carol for Language Courses in Tripoli, Lebanon. Share your interests, ask about Spanish and get directions to the center.',
      short: 'A hello that can take you somewhere new.',
      headline: 'A world of connection.\nA word in Spanish.',
      intro: 'Explore Spanish at Carol for Language Courses in Tripoli. Start with your interests and the people, places or conversations that make you want to learn.',
      sectionTitle: 'Let your interests lead the way.',
      paragraphs: ['Spanish may already be part of the music you listen to, the films you enjoy or the places you want to visit. Learning the language can turn that familiarity into a more personal connection.', 'It helps to know what you are hoping to do with Spanish. Tell Carol about your experience with the language and what you would most like to understand or express, then ask about the course options available.'],
      goals: [
        ['People and conversation', 'Think about introducing yourself, sharing an interest or getting to know someone through another language.'],
        ['Music, film and culture', 'Let us know what you enjoy in Spanish and what you would like to follow with more understanding.'],
        ['Travel and discovery', 'Consider the everyday situations you would like to handle when visiting a Spanish-speaking place or meeting its people.']
      ],
      question: 'What is useful to know before asking about Spanish?',
      answer: 'You do not need a perfect plan. Tell Carol if you have studied Spanish before, what interests you about it and what you would like to be able to do. That is a useful starting point for your enquiry.',
      message: 'Hello Carol! I am interested in Spanish lessons. Could you tell me about the available course options?'
    },
    ar: {
      name: 'الإسبانية', title: 'دورات إسباني في طرابلس | كارول لتعليم اللغات',
      description: 'تعرّف على دورات الإسبانية في كارول لتعليم اللغات بطرابلس، لبنان. شاركنا اهتماماتك، اسأل عن الإسبانية واعرف عنوان المركز.',
      short: 'تحيّة بسيطة تفتح لك باباً جديداً.',
      headline: 'عالم من التواصل.\nوكلمة بالإسبانية.',
      intro: 'تعرّف على الإسبانية في كارول لتعليم اللغات بطرابلس. ابدأ باهتماماتك وبالأشخاص أو الأماكن أو الأحاديث التي تشجّعك على تعلّمها.',
      sectionTitle: 'دع اهتماماتك ترسم البداية.',
      paragraphs: ['ربما تكون الإسبانية حاضرة في الأغاني التي تسمعها، أو الأفلام التي تحبّها، أو الأماكن التي تريد زيارتها. تعلّم اللغة يمكن أن يجعل علاقتك بها أقرب.', 'من المفيد أن تعرف ما الذي تريد استخدام الإسبانية من أجله. أخبر كارول عن تجربتك مع اللغة وما تودّ فهمه أو التعبير عنه، ثم اسأل عن خيارات الدورات المتاحة.'],
      goals: [
        ['الناس والمحادثات', 'فكّر بالتعريف عن نفسك، أو مشاركة اهتمام، أو التعرّف إلى شخص جديد بلغة أخرى.'],
        ['الموسيقى والسينما والثقافة', 'احكِ لنا عمّا تستمتع به بالإسبانية وما تريد أن تفهمه بشكل أوضح.'],
        ['السفر والاكتشاف', 'تخيّل المواقف اليومية التي تريد أن تتواصل فيها عند زيارة مكان يتحدّث أهله الإسبانية أو التعرّف إليهم.']
      ],
      question: 'ماذا أحتاج أن أعرف قبل السؤال عن الإسبانية؟',
      answer: 'لا تحتاج إلى خطّة جاهزة. أخبر كارول إن كنت قد درست الإسبانية من قبل، وما الذي يجذبك إليها، وما الذي تتمنّى أن تتمكّن من فعله بها. هذه بداية كافية للسؤال عن الدورة.',
      message: 'مرحباً كارول! أنا مهتم/ة بدورة اللغة الإسبانية. ممكن أعرف ما هي الخيارات المتاحة؟'
    }
  },
  {
    slug: 'french', code: 'FR', native: 'Français', greeting: 'Bonjour.', greetingLang: 'fr',
    en: {
      name: 'French', title: 'French courses in Tripoli, Lebanon | Carol',
      description: 'Learn French at Carol for Language Courses in Tripoli, Lebanon. Explore French for conversation, study or travel and ask about available courses on WhatsApp.',
      short: 'Bring French into your everyday conversations.',
      headline: 'Find your words.\nMake them French.',
      intro: 'Learn French at Carol for Language Courses on Beshara Khoury Street in Tripoli. Whether French is new to you or already part of your life, tell us what you want to understand, say or read with more confidence.',
      sectionTitle: 'Make room for French in your day.',
      paragraphs: ['In Lebanon, French can be part of a conversation, a university text, a message at work or a film you enjoy. Start with the situations that matter to you: finding the right words, following a discussion or understanding what you read.', 'When you ask about a French course, tell us what you have studied before and what feels difficult today. You might be starting from the beginning, returning after a break or looking to use what you already know. The center can explain the available course options, fees and schedule directly.'],
      goals: [
        ['Speaking and listening', 'Tell us about the conversations you want to join, from introducing yourself to following everyday questions and replies.'],
        ['Study and daily reading', 'If you encounter French in your studies or at work, explain the texts and situations you would like to understand more comfortably.'],
        ['Travel and culture', 'Bring your interest in French-speaking places, films, music or people into your first conversation with Carol.']
      ],
      question: 'Can I ask about French if I studied it at school?',
      answer: 'Of course. Tell Carol what you remember, what you find difficult and what you want to use French for now. Ask which current course options suit your starting point, and confirm the timetable and fees before registering.',
      message: 'Hello Carol! I am interested in French courses. Could you tell me about the available options, schedule and fees?'
    },
    ar: {
      name: 'الفرنسية', title: 'دورات فرنسي في طرابلس، لبنان | كارول لتعليم اللغات',
      description: 'تعلّم الفرنسية في كارول لتعليم اللغات بطرابلس، لبنان. تعرّف على الفرنسية للمحادثة والدراسة والسفر واسأل عن الدورات المتاحة عبر واتساب.',
      short: 'قرّب الفرنسية من محادثاتك اليومية.',
      headline: 'لاقِ كلماتك.\nوعبّر بالفرنسية.',
      intro: 'تعلّم الفرنسية في كارول لتعليم اللغات في شارع بشارة الخوري بطرابلس. سواء كانت الفرنسية جديدة عليك أو جزءاً من حياتك، احكِ لنا عمّا تريد فهمه أو قوله أو قراءته بثقة أكبر.',
      sectionTitle: 'اجعل للفرنسية مكاناً في يومك.',
      paragraphs: ['في لبنان، قد تصادف الفرنسية في محادثة، أو نصّ جامعي، أو رسالة في العمل، أو فيلم تحبّه. ابدأ بالمواقف التي تهمّك: إيجاد الكلمة المناسبة، متابعة نقاش، أو فهم ما تقرأه.', 'عندما تسأل عن دورة فرنسية، أخبرنا بما درسته من قبل وبما تجده صعباً اليوم. ربما تبدأ من الصفر، أو تعود بعد انقطاع، أو تريد استخدام ما تعرفه. يوضّح لك المركز مباشرةً خيارات الدورات المتاحة والمواعيد والرسوم.'],
      goals: [
        ['المحادثة والاستماع', 'احكِ لنا عن الأحاديث التي تريد المشاركة فيها، من التعريف عن نفسك إلى فهم الأسئلة والأجوبة اليومية.'],
        ['الدراسة والقراءة اليومية', 'إذا كنت تصادف الفرنسية في الدراسة أو العمل، وضّح نوع النصوص والمواقف التي تريد فهمها براحة أكبر.'],
        ['السفر والثقافة', 'شاركنا اهتمامك بالأماكن الناطقة بالفرنسية، أو الأفلام والموسيقى، أو الأشخاص الذين تريد التواصل معهم.']
      ],
      question: 'هل يمكنني السؤال عن الفرنسية إذا درستها في المدرسة؟',
      answer: 'أكيد. أخبر كارول بما تتذكّره، وما تجده صعباً، ولماذا تريد استخدام الفرنسية اليوم. اسأل عن الخيارات المتاحة التي تناسب بدايتك، وتأكّد من المواعيد والرسوم قبل التسجيل.',
      message: 'مرحباً كارول! أنا مهتم/ة بدورات اللغة الفرنسية. ممكن أعرف الخيارات المتاحة والمواعيد والرسوم؟'
    }
  },
  {
    slug: 'turkish', code: 'TR', native: 'Türkçe', greeting: 'Merhaba.', greetingLang: 'tr',
    en: {
      name: 'Turkish', title: 'Turkish courses in Tripoli, Lebanon | Carol',
      description: 'Learn Turkish at Carol for Language Courses in Tripoli, Lebanon. Explore Turkish for everyday conversation, travel and culture. Contact the center directly.',
      short: 'From your first merhaba to a real connection.',
      headline: 'Begin with merhaba.\nKeep the conversation going.',
      intro: 'Explore Turkish at Carol for Language Courses in Tripoli. Your interest might start with a journey, a series you love or someone you want to speak with. Tell us your reason, and ask about the course options available.',
      sectionTitle: 'Take your curiosity a little further.',
      paragraphs: ['Turkish may sound familiar from films, music or a visit to Türkiye. Learning the language gives that interest a new direction: reading signs, asking a question, understanding a reply or getting to know someone beyond a greeting.', 'The Turkish alphabet and sentence patterns may be new to you, and that is useful to mention when you enquire. If you have studied before, tell Carol what you already know. Discuss your goal, availability and the current timetable and fees with the center before choosing a course.'],
      goals: [
        ['Everyday exchanges', 'Think about introducing yourself, asking for something, understanding a simple reply or talking about your day.'],
        ['Travel and connection', 'Share the situations you would like to handle during a trip to Türkiye or when speaking with Turkish-speaking friends.'],
        ['Stories and culture', 'If a series, song or interest brought you to Turkish, tell us what you would like to understand and enjoy in the original language.']
      ],
      question: 'Do I need to know Turkish before asking about a course?',
      answer: 'No. Let Carol know if Turkish is completely new to you, or describe any previous study. Ask about the current course options for your starting point and confirm the schedule and fees directly with the center.',
      message: 'Hello Carol! I am interested in Turkish courses. Could you tell me about the available options, schedule and fees?'
    },
    ar: {
      name: 'التركية', title: 'دورات تركي في طرابلس، لبنان | كارول لتعليم اللغات',
      description: 'اكتشف دورات التركية في كارول لتعليم اللغات بطرابلس، لبنان. تعرّف على التركية للمحادثة اليومية والسفر والثقافة وتواصل مباشرةً مع المركز.',
      short: 'من أوّل «مرحبا» إلى تواصل أقرب.',
      headline: 'ابدأ بـ Merhaba.\nوكمّل الحكاية بالتركية.',
      intro: 'تعرّف على التركية في كارول لتعليم اللغات بطرابلس. قد يبدأ اهتمامك برحلة، أو مسلسل تحبّه، أو شخص تريد أن تتحدّث معه. احكِ لنا عن سببك واسأل عن خيارات الدورات المتاحة.',
      sectionTitle: 'خذ فضولك إلى خطوة أبعد.',
      paragraphs: ['ربما تكون التركية مألوفة لأذنك من الأفلام أو الموسيقى أو زيارة إلى تركيا. تعلّمها يعطي هذا الاهتمام اتجاهاً جديداً: قراءة لافتة، طرح سؤال، فهم جواب، أو التعرّف إلى شخص بأكثر من مجرّد تحيّة.', 'قد تكون الأبجدية التركية وترتيب الكلمات جديدين عليك، ومن المفيد ذكر ذلك عند السؤال عن الدورة. وإذا درست اللغة سابقاً، أخبر كارول بما تعرفه. ناقش هدفك والأوقات التي تناسبك والمواعيد والرسوم الحالية مع المركز قبل اختيار الدورة.'],
      goals: [
        ['مواقف يومية', 'فكّر بالتعريف عن نفسك، أو طلب شيء، أو فهم جواب بسيط، أو الحديث عن يومك.'],
        ['السفر والتواصل', 'شاركنا المواقف التي تريد أن تتواصل فيها خلال رحلة إلى تركيا أو مع أصدقاء يتحدّثون التركية.'],
        ['الحكايات والثقافة', 'إذا جذبك مسلسل أو أغنية أو اهتمام معيّن إلى التركية، احكِ لنا عمّا تريد فهمه والاستمتاع به بلغته الأصلية.']
      ],
      question: 'هل أحتاج إلى معرفة التركية قبل السؤال عن دورة؟',
      answer: 'لا. أخبر كارول إذا كانت التركية جديدة عليك تماماً، أو وضّح ما درسته من قبل. اسأل عن الخيارات المتاحة التي تناسب بدايتك، وتأكّد من المواعيد والرسوم مباشرةً مع المركز.',
      message: 'مرحباً كارول! أنا مهتم/ة بدورات اللغة التركية. ممكن أعرف الخيارات المتاحة والمواعيد والرسوم؟'
    }
  }
];
