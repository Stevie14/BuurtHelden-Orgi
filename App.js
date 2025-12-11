// App.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

// Platform provisie (20%)
const PLATFORM_FEE_PERCENTAGE = 20;

// Start-klussen (kun je later koppelen aan een backend)
const INITIAL_JOBS = [
  {
    id: '1',
    title: 'Boodschappen doen voor oma',
    description: 'Albert Heijn om de hoek, 5 kleine boodschappen halen.',
    budget: 15,
    distanceKm: 0.5,
    category: 'Boodschappen',
    status: 'open',
    createdBy: 'Buurtgenoot',
    createdByEmail: 'opdrachtgever1@buurthelden.app',
    location: 'Nieuwerkerk aan den IJssel',
    createdAt: 'Vandaag',
    ownerPhone: '06-12345678',
    helperPhone: null,
    acceptedBy: null,
    tikkiePaid: false,
  },
  {
    id: '2',
    title: 'Lamp ophangen in de woonkamer',
    description:
      'Ik heb een boormachine, alleen iemand nodig die handig is met boren.',
    budget: 25,
    distanceKm: 1.2,
    category: 'Huis & tuin',
    status: 'open',
    createdBy: 'Buurtgenoot',
    createdByEmail: 'opdrachtgever2@buurthelden.app',
    location: 'Rotterdam Ommoord',
    createdAt: 'Vandaag',
    ownerPhone: '06-87654321',
    helperPhone: null,
    acceptedBy: null,
    tikkiePaid: false,
  },
  {
    id: '3',
    title: 'Hond uitlaten (30 minuten)',
    description: 'Labrador uitlaten rondje park.',
    budget: 10,
    distanceKm: 0.3,
    category: 'Huisdieren',
    status: 'open',
    createdBy: 'Buurtgenoot',
    createdByEmail: 'opdrachtgever3@buurthelden.app',
    location: 'Capelle aan den IJssel',
    createdAt: 'Gisteren',
    ownerPhone: '06-11112222',
    helperPhone: null,
    acceptedBy: null,
    tikkiePaid: false,
  },
];

/* ---------------------- SPLASH / LOADING ---------------------- */

function SplashView() {
  return (
    <SafeAreaView style={styles.splashSafeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.splashContainer}>
        <Text style={styles.splashTitle}>BuurtHelden</Text>
        <View style={styles.logoRow}>
          <Text style={styles.splashSubtitle}>Heitje voor een karweitje</Text>
          <View style={styles.logoIconsRow}>
            <View style={styles.toolLogoBig}>
              <Text style={styles.toolLogoText}>🛠️</Text>
            </View>
            <View style={styles.vehicleLogoBig}>
              <Text style={styles.toolLogoText}>🚲</Text>
            </View>
          </View>
        </View>
        <Text style={styles.splashTagline}>
          Verbind buren met elkaar, regel kleine klussen professioneel.
        </Text>
        <ActivityIndicator size="large" style={{ marginTop: 24 }} />
      </View>
    </SafeAreaView>
  );
}

/* ---------------------- HEADER ---------------------- */

function AuthHeader() {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoTitle}>BuurtHelden</Text>
      <View style={styles.logoRow}>
        <Text style={styles.logoSubtitle}>Heitje voor een karweitje</Text>
        <View style={styles.logoIconsRow}>
          <View style={styles.toolLogo}>
            <Text style={styles.toolLogoText}>🛠️</Text>
          </View>
          <View style={styles.vehicleLogo}>
            <Text style={styles.toolLogoText}>🚲</Text>
            {/* Wil je auto? Vervang 🚲 door 🚗 */}
          </View>
        </View>
      </View>
    </View>
  );
}

/* ---------------------- LOGIN ---------------------- */

function LoginView({ onLoginSuccess, onGoRegister, onGoPrivacy, onGoTerms }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Let op', 'Vul je e-mailadres en wachtwoord in.');
      return;
    }

    onLoginSuccess({
      name: email.split('@')[0] || 'BuurtHeld',
      email: email,
      radiusKm: 5,
      bio: 'Ik help graag mensen in de buurt.',
      phone: '',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.authContainer}>
          <AuthHeader />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Inloggen</Text>

            <Text style={styles.inputLabel}>E-mailadres</Text>
            <TextInput
              style={styles.input}
              placeholder="jouwmail@voorbeeld.nl"
              placeholderTextColor="#A0AEC0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>Wachtwoord</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#A0AEC0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.primaryButtonText}>Inloggen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onGoRegister}>
              <Text style={styles.linkButtonText}>
                Nog geen account?{' '}
                <Text style={styles.linkButtonTextBold}>Registreer</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.appInfoContainer}>
            <Text style={styles.appInfoTitle}>Waar is BuurtHelden voor?</Text>
            <Text style={styles.appInfoText}>
              BuurtHelden is een platform om buren met elkaar te verbinden
              voor kleine en middelgrote klussen: boodschappen, pakketjes ophalen,
              hulp in huis, met iemand meegaan naar een afspraak en nog veel meer.
              Mensen met een klus worden gekoppeld aan BuurtHelden in de buurt die willen helpen.
            </Text>

            <Text style={styles.appInfoTitle}>Veiligheid & professionaliteit</Text>
            <Text style={styles.appInfoText}>
              Spreek altijd duidelijke verwachtingen af over tijd, vergoeding en werkzaamheden.
              Voelt een klus, afspraak of persoon onveilig of niet goed? Doe het dan niet.
              In ernstige situaties neem je contact op met de hulpdiensten.
            </Text>

            <Text style={styles.appInfoText}>
              Via de klachtfunctie kun je ongewenst gedrag melden. Bij herhaalde klachten
              kan een gebruiker worden geblokkeerd.
            </Text>
          </View>

          <View style={styles.legalLinksRow}>
            <TouchableOpacity onPress={onGoPrivacy}>
              <Text style={styles.legalLinkText}>Privacybeleid</Text>
            </TouchableOpacity>
            <Text style={styles.legalDot}>•</Text>
            <TouchableOpacity onPress={onGoTerms}>
              <Text style={styles.legalLinkText}>Algemene voorwaarden</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------------------- REGISTER ---------------------- */

function RegisterView({ onRegisterSuccess, onGoLogin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState(
    'Ik ben een BuurtHeld en help graag mensen in de buurt.'
  );

  const handleRegister = () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Let op', 'Vul alle velden in (incl. mobiel nummer).');
      return;
    }

    onRegisterSuccess({
      name,
      email,
      radiusKm: 5,
      bio,
      phone,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.authContainer}>
          <AuthHeader />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Account aanmaken</Text>

            <Text style={styles.inputLabel}>Naam</Text>
            <TextInput
              style={styles.input}
              placeholder="Bijv. Steven"
              placeholderTextColor="#A0AEC0"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>Mobiel nummer</Text>
            <TextInput
              style={styles.input}
              placeholder="Bijv. 06-12345678"
              placeholderTextColor="#A0AEC0"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.inputLabel}>E-mailadres</Text>
            <TextInput
              style={styles.input}
              placeholder="jouwmail@voorbeeld.nl"
              placeholderTextColor="#A0AEC0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>Wachtwoord</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#A0AEC0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.inputLabel}>Korte beschrijving</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Vertel kort wie je bent en waarom je dit doet."
              placeholderTextColor="#A0AEC0"
              value={bio}
              onChangeText={setBio}
              multiline
            />

            <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
              <Text style={styles.primaryButtonText}>Account aanmaken</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onGoLogin}>
              <Text style={styles.linkButtonText}>Terug naar inloggen</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------------------- HOME ---------------------- */

function HomeView({
  user,
  jobs,
  onGoNewJob,
  onGoMyJobs,
  onGoProfile,
  onOpenJob,
  onLogout,
  blockedUsers,
}) {
  const openJobs = jobs.filter((job) => job.status === 'open');
  const myAccepted = jobs.filter((job) => job.acceptedBy === user?.email);
  const myCreated = jobs.filter((job) => job.createdByEmail === user?.email);
  const isBlocked = blockedUsers.includes(user?.email);

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => onOpenJob(item.id)}
    >
      <View style={styles.jobHeaderRow}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.jobBudget}>€ {item.budget}</Text>
      </View>
      <Text style={styles.jobMeta}>
        {item.category} • {item.distanceKm} km • {item.location}
      </Text>
      <Text style={styles.jobDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.jobCreatedAt}>{item.createdAt}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.homeContainer}>
        <View style={styles.homeTopRow}>
          <View style={styles.homeHeader}>
            <Text style={styles.homeGreeting}>Hoi BuurtHeld 👋</Text>
            <Text style={styles.homeSubtitle}>
              Bedankt dat je andere mensen in de buurt wilt helpen.
            </Text>
            <Text style={styles.homeSubtitleSmall}>
              Klussen binnen {user?.radiusKm} km van jouw locatie worden hier weergegeven.
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutText}>Afmelden</Text>
          </TouchableOpacity>
        </View>

        {isBlocked && (
          <View style={styles.infoBoxBlocked}>
            <Text style={styles.infoBoxText}>
              Je account is geblokkeerd vanwege meerdere klachten.
              Je kunt geen nieuwe klussen meer plaatsen of accepteren.
            </Text>
          </View>
        )}

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Open klussen</Text>
            <Text style={styles.statValue}>{openJobs.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Geaccepteerd</Text>
            <Text style={styles.statValue}>{myAccepted.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Geplaatst</Text>
            <Text style={styles.statValue}>{myCreated.length}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[
              styles.secondaryButton,
              isBlocked && { opacity: 0.4 },
            ]}
            onPress={() => {
              if (isBlocked) {
                Alert.alert(
                  'Geblokkeerd',
                  'Je bent geblokkeerd en kunt geen nieuwe klussen meer plaatsen.'
                );
                return;
              }
              onGoNewJob();
            }}
          >
            <Text style={styles.secondaryButtonText}>Nieuwe klus plaatsen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostButton} onPress={onGoMyJobs}>
            <Text style={styles.ghostButtonText}>Mijn klussen</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Klussen in de buurt</Text>
        {openJobs.length === 0 ? (
          <Text style={styles.emptyText}>
            Er zijn momenteel geen open klussen. Plaats een nieuwe klus of kom later terug.
          </Text>
        ) : (
          <FlatList
            data={openJobs}
            keyExtractor={(item) => item.id}
            renderItem={renderJobItem}
            scrollEnabled={false}
          />
        )}

        <TouchableOpacity style={styles.profileShortcut} onPress={onGoProfile}>
          <Text style={styles.profileShortcutText}>Profiel & instellingen bekijken</Text>
        </TouchableOpacity>

        <Text style={styles.platformFeeText}>
          BuurtHelden rekent {PLATFORM_FEE_PERCENTAGE}% platformprovisie per klus.
          Deze provisie wordt via Tikkie of een vergelijkbare betaaloplossing afgerekend.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------------- NIEUWE KLUS ---------------------- */

function NewJobView({ user, jobs, setJobs, onBackHome, blockedUsers }) {
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Nieuwerkerk aan den IJssel');
  const [category, setCategory] = useState('Huis & tuin');
  const [phone, setPhone] = useState(user?.phone || '');

  const isBlocked = blockedUsers.includes(user?.email);

  const numericBudget =
    parseFloat(String(budget).replace(',', '.')) || 0;
  const platformFee = (numericBudget * PLATFORM_FEE_PERCENTAGE) / 100;
  const helperAmount = numericBudget - platformFee;

  const handleCreateJob = () => {
    if (isBlocked) {
      Alert.alert(
        'Geblokkeerd',
        'Je bent geblokkeerd en kunt geen nieuwe klussen meer plaatsen.'
      );
      return;
    }

    if (!title || !budget || !description || !phone) {
      Alert.alert(
        'Let op',
        'Vul minimaal titel, bedrag, omschrijving én telefoonnummer in.'
      );
      return;
    }

    const numeric = parseFloat(String(budget).replace(',', '.'));

    if (isNaN(numeric) || numeric <= 0) {
      Alert.alert('Let op', 'Vul een geldig bedrag in (bijv. 25 of 25,50).');
      return;
    }

    const newJob = {
      id: String(jobs.length + 1),
      title,
      description,
      budget: numeric,
      distanceKm: 1.0,
      category,
      status: 'open',
      createdBy: user?.name || 'Onbekend',
      createdByEmail: user?.email || '',
      acceptedBy: null,
      location,
      createdAt: 'Zojuist',
      ownerPhone: phone,
      helperPhone: null,
      tikkiePaid: false,
    };

    setJobs([newJob, ...jobs]);
    Alert.alert('Klus geplaatst', 'Je klus is succesvol geplaatst.');
    onBackHome();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.screenContainer}>
          <Text style={styles.screenTitle}>Nieuwe klus plaatsen</Text>

          <Text style={styles.inputLabel}>Titel van de klus</Text>
          <TextInput
            style={styles.input}
            placeholder="Bijv. Laminaat leggen slaapkamer"
            placeholderTextColor="#A0AEC0"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.inputLabel}>Totaal bedrag (in euro)</Text>
          <TextInput
            style={styles.input}
            placeholder="Bijv. 40"
            placeholderTextColor="#A0AEC0"
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
          />
          <Text style={styles.smallNote}>
            BuurtHelden rekent {PLATFORM_FEE_PERCENTAGE}% provisie over het totaalbedrag.
          </Text>
          {numericBudget > 0 && (
            <>
              <Text style={styles.smallNote}>
                Voorbeeldberekening: € {numericBudget.toFixed(2)} totaal • €{' '}
                {platformFee.toFixed(2)} platformprovisie • €{' '}
                {helperAmount.toFixed(2)} naar de BuurtHeld.
              </Text>
              <Text style={styles.smallNote}>
                De betaling van het klusbedrag regel je onderling, bijvoorbeeld via Tikkie of contant.
              </Text>
            </>
          )}

          <Text style={styles.inputLabel}>Locatie</Text>
          <TextInput
            style={styles.input}
            placeholder="Bijv. Nieuwerkerk aan den IJssel"
            placeholderTextColor="#A0AEC0"
            value={location}
            onChangeText={setLocation}
          />

          <Text style={styles.inputLabel}>Categorie</Text>
          <TextInput
            style={styles.input}
            placeholder="Bijv. Huis & tuin, Boodschappen"
            placeholderTextColor="#A0AEC0"
            value={category}
            onChangeText={setCategory}
          />

          <Text style={styles.inputLabel}>Telefoonnummer bij deze klus</Text>
          <TextInput
            style={styles.input}
            placeholder="Bijv. 06-12345678"
            placeholderTextColor="#A0AEC0"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.inputLabel}>Omschrijving</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Beschrijf kort wat er moet gebeuren en wanneer."
            placeholderTextColor="#A0AEC0"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleCreateJob}>
            <Text style={styles.primaryButtonText}>Klus plaatsen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={onBackHome}>
            <Text style={styles.linkButtonText}>Annuleren</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------------------- KLUS DETAIL ---------------------- */

function JobDetailView({
  user,
  jobs,
  setJobs,
  jobId,
  onBack,
  userComplaints,
  blockedUsers,
  onComplaintUser,
}) {
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screenContainer}>
          <Text style={styles.emptyText}>Klus niet gevonden.</Text>
          <TouchableOpacity style={styles.linkButton} onPress={onBack}>
            <Text style={styles.linkButtonText}>Terug</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isOwner = job.createdByEmail === user?.email;
  const hasAccepted = job.acceptedBy === user?.email;
  const ownerEmail = job.createdByEmail;
  const helperEmail = job.acceptedBy;
  const isUserBlocked = blockedUsers.includes(user?.email);
  const tikkiePaid = job.tikkiePaid && hasAccepted;

  const ownerComplaintCount = ownerEmail
    ? userComplaints[ownerEmail] || 0
    : 0;
  const helperComplaintCount = helperEmail
    ? userComplaints[helperEmail] || 0
    : 0;

  const handleAccept = () => {
    if (isOwner) {
      Alert.alert('Let op', 'Je kunt je eigen klus niet accepteren.');
      return;
    }

    if (isUserBlocked) {
      Alert.alert(
        'Geblokkeerd',
        'Je bent geblokkeerd en kunt geen nieuwe klussen meer accepteren.'
      );
      return;
    }

    Alert.alert(
      'Klus accepteren',
      'Weet je zeker dat je deze klus wilt?\n\n' +
        'Na accepteren moet je eerst de Tikkie-provisie betalen. ' +
        'Gaat de klus op een of andere manier niet door? Dan kan de opdrachtgever de klus opnieuw aanbieden.',
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Ja, accepteren',
          onPress: () => {
            const updatedJobs = jobs.map((j) =>
              j.id === job.id
                ? {
                    ...j,
                    acceptedBy: user?.email,
                    status: 'geaccepteerd',
                    helperPhone: user?.phone || '',
                  }
                : j
            );
            setJobs(updatedJobs);

            Alert.alert(
              'Klus geaccepteerd',
              'Je hebt deze klus geaccepteerd. Betaal nu eerst de platformprovisie via de Tikkie-knop.'
            );
          },
        },
      ]
    );
  };

  const handleTikkiePay = () => {
    if (!hasAccepted) {
      Alert.alert(
        'Eerst accepteren',
        'Accepteer eerst de klus voordat je de Tikkie betaalt.'
      );
      return;
    }

    const platformFee = (job.budget * PLATFORM_FEE_PERCENTAGE) / 100;

    Alert.alert(
      'Tikkie-betaling',
      `Hier wordt de Tikkie-link voor de platformprovisie geopend.\n\n` +
        `Platformprovisie: € ${platformFee.toFixed(2)} (20% van € ${job.budget.toFixed(
          2
        )}).\n\n` +
        `Zorg dat je in de uiteindelijke productieversie een geldige Tikkie- of betaal-link koppelt aan deze actie.`,
      [
        {
          text: 'Tikkie betaald',
          onPress: () => {
            const updatedJobs = jobs.map((j) =>
              j.id === job.id
                ? {
                    ...j,
                    tikkiePaid: true,
                  }
                : j
            );
            setJobs(updatedJobs);
          },
        },
        { text: 'Annuleren', style: 'cancel' },
      ]
    );
  };

  const handleReopenJob = () => {
    Alert.alert(
      'Klus opnieuw aanbieden',
      'Weet je zeker dat je deze klus opnieuw wilt aanbieden? De koppeling met de huidige helper wordt verwijderd.',
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Opnieuw aanbieden',
          onPress: () => {
            const updated = jobs.map((j) =>
              j.id === job.id
                ? {
                    ...j,
                    status: 'open',
                    acceptedBy: null,
                    helperPhone: null,
                    tikkiePaid: false,
                    createdAt: 'Opnieuw aangeboden',
                  }
                : j
            );
            setJobs(updated);
            Alert.alert('Gelukt', 'De klus is opnieuw aangeboden.');
            onBack();
          },
        },
      ]
    );
  };

  const handleComplaintPress = (email, typeLabel) => {
    if (!email) {
      Alert.alert('Let op', 'Er is nog geen persoon gekoppeld voor deze rol.');
      return;
    }

    const result = onComplaintUser(email);
    if (result.blocked) {
      Alert.alert(
        `${typeLabel} geblokkeerd`,
        `Door meerdere klachten is deze ${typeLabel.toLowerCase()} nu geblokkeerd in BuurtHelden.`
      );
    } else if (result.warning) {
      Alert.alert(
        'Waarschuwing geregistreerd',
        `Er is een klacht geregistreerd over deze ${typeLabel.toLowerCase()}. ` +
          'Bij een volgende klacht kan deze persoon worden geblokkeerd.'
      );
    } else {
      Alert.alert(
        'Klacht geregistreerd',
        `Er staat nu ${result.count} klacht(en) geregistreerd over deze ${typeLabel.toLowerCase()}.`
      );
    }
  };

  const handleDeleteJob = () => {
    Alert.alert(
      'Klus verwijderen',
      'Weet je zeker dat je deze klus wilt verwijderen?',
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Verwijderen',
          style: 'destructive',
          onPress: () => {
            const updatedJobs = jobs.filter((j) => j.id !== job.id);
            setJobs(updatedJobs);
            Alert.alert('Verwijderd', 'Je klus is verwijderd.');
            onBack();
          },
        },
      ]
    );
  };

  const hasAnyPhone = job.ownerPhone || job.helperPhone;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.screenTitle}>{job.title}</Text>
          {tikkiePaid && (
            <View style={styles.badgePaid}>
              <Text style={styles.badgePaidText}>Tikkie betaald</Text>
            </View>
          )}
        </View>

        <Text style={styles.jobDetailBudget}>€ {job.budget}</Text>
        <Text style={styles.jobDetailMeta}>
          {job.category} • {job.distanceKm} km • {job.location}
        </Text>
        <Text style={styles.jobDetailMeta}>Geplaatst door: {job.createdBy}</Text>
        <Text style={styles.jobDetailMeta}>Status: {job.status}</Text>

        {ownerEmail && (
          <Text style={styles.jobDetailMeta}>
            Klachten over opdrachtgever: {ownerComplaintCount}
            {blockedUsers.includes(ownerEmail) ? ' (geblokkeerd)' : ''}
          </Text>
        )}
        {helperEmail && (
          <Text style={styles.jobDetailMeta}>
            Klachten over helper: {helperComplaintCount}
            {blockedUsers.includes(helperEmail) ? ' (geblokkeerd)' : ''}
          </Text>
        )}

        <Text style={styles.inputLabel}>Omschrijving</Text>
        <Text style={styles.jobDetailDescription}>{job.description}</Text>

        <Text style={styles.inputLabel}>Contactgegevens</Text>
        {hasAnyPhone ? (
          <>
            {job.ownerPhone && (
              <Text style={styles.jobDetailMeta}>
                Telefoon opdrachtgever: {job.ownerPhone}
              </Text>
            )}
            {job.helperPhone && (
              <Text style={styles.jobDetailMeta}>
                Telefoon helper: {job.helperPhone}
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.jobDetailMeta}>
            Er zijn nog geen telefoonnummers bekend bij deze klus.
          </Text>
        )}

        <Text style={styles.smallNote}>
          De betaling van het klusbedrag regel je altijd onderling, bijvoorbeeld via Tikkie of contant.
          De platformprovisie wordt via een aparte Tikkie voldaan.
        </Text>

        {!isOwner && !hasAccepted && job.status === 'open' && (
          <TouchableOpacity style={styles.primaryButton} onPress={handleAccept}>
            <Text style={styles.primaryButtonText}>Deze klus accepteren</Text>
          </TouchableOpacity>
        )}

        {hasAccepted && (
          <>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxText}>
                Je hebt deze klus geaccepteerd. Gebruik de telefoonnummers hierboven
                om contact te leggen en de afspraak en betaling verder af te stemmen.
              </Text>
            </View>

            <View style={styles.tikkieRow}>
              <TouchableOpacity
                style={[
                  styles.tikkieButton,
                  tikkiePaid && styles.tikkieButtonDisabled,
                ]}
                onPress={tikkiePaid ? undefined : handleTikkiePay}
                disabled={tikkiePaid}
              >
                <Text style={styles.tikkieButtonText}>
                  {tikkiePaid ? 'Tikkie betaald' : 'Tikkie betalen'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {isOwner && helperEmail && (
          <TouchableOpacity
            style={styles.complaintButton}
            onPress={() => handleComplaintPress(helperEmail, 'Helper')}
          >
            <Text style={styles.complaintButtonText}>
              Klacht over helper melden
            </Text>
          </TouchableOpacity>
        )}

        {hasAccepted && ownerEmail && !isOwner && (
          <TouchableOpacity
            style={styles.complaintButtonSecondary}
            onPress={() => handleComplaintPress(ownerEmail, 'Opdrachtgever')}
          >
            <Text style={styles.complaintButtonText}>
              Klacht over opdrachtgever melden
            </Text>
          </TouchableOpacity>
        )}

        {isOwner && (
          <>
            <View style={styles.infoBoxOwner}>
              <Text style={styles.infoBoxText}>
                Dit is jouw geplaatste klus. Gaat de klus op een of andere manier niet door,
                dan kun je de opdracht opnieuw aanbieden zodat andere BuurtHelden hem weer kunnen accepteren.
              </Text>
            </View>

            {job.acceptedBy && (
              <TouchableOpacity
                style={styles.reopenButton}
                onPress={handleReopenJob}
              >
                <Text style={styles.reopenButtonText}>Opdracht opnieuw aanbieden</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteJob}
            >
              <Text style={styles.deleteButtonText}>Deze klus verwijderen</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.linkButton} onPress={onBack}>
          <Text style={styles.linkButtonText}>Terug</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------------- MIJN KLUSSEN ---------------------- */

function MyJobsView({ user, jobs, onOpenJob, onBackHome }) {
  const myCreated = jobs.filter((job) => job.createdByEmail === user?.email);
  const myAccepted = jobs.filter((job) => job.acceptedBy === user?.email);

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => onOpenJob(item.id)}
    >
      <View style={styles.jobHeaderRow}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.jobBudget}>€ {item.budget}</Text>
      </View>
      <Text style={styles.jobMeta}>
        {item.category} • {item.location}
      </Text>
      <Text style={styles.jobDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.jobCreatedAt}>{item.createdAt}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <Text style={styles.screenTitle}>Mijn klussen</Text>

        <Text style={styles.sectionTitle}>Geaccepteerde klussen</Text>
        {myAccepted.length === 0 ? (
          <Text style={styles.emptyText}>Je hebt nog geen klussen geaccepteerd.</Text>
        ) : (
          <FlatList
            data={myAccepted}
            keyExtractor={(item) => item.id}
            renderItem={renderJobItem}
            scrollEnabled={false}
          />
        )}

        <Text style={styles.sectionTitle}>Geplaatste klussen</Text>
        {myCreated.length === 0 ? (
          <Text style={styles.emptyText}>Je hebt nog geen klussen geplaatst.</Text>
        ) : (
          <FlatList
            data={myCreated}
            keyExtractor={(item) => item.id}
            renderItem={renderJobItem}
            scrollEnabled={false}
          />
        )}

        <TouchableOpacity style={styles.linkButton} onPress={onBackHome}>
          <Text style={styles.linkButtonText}>Terug naar overzicht</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------------- PROFIEL ---------------------- */

function ProfileView({ user, setUser, onBackHome }) {
  const [name, setName] = useState(user?.name || '');
  const [radiusKm, setRadiusKm] = useState(String(user?.radiusKm || 5));
  const [bio, setBio] = useState(
    user?.bio || 'Ik ben een BuurtHeld en help graag mensen in de buurt.'
  );
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    if (!name || !radiusKm) {
      Alert.alert('Let op', 'Naam en straal zijn verplicht.');
      return;
    }

    setUser({
      ...user,
      name,
      radiusKm: Number(radiusKm),
      bio,
      phone,
    });

    Alert.alert('Opgeslagen', 'Je profiel is bijgewerkt.');
    onBackHome();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.screenContainer}>
          <Text style={styles.screenTitle}>Profiel & instellingen</Text>

          <Text style={styles.inputLabel}>Naam</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.inputLabel}>E-mailadres</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#EDF2F7' }]}
            value={user?.email || ''}
            editable={false}
          />

          <Text style={styles.inputLabel}>Mobiel nummer</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.inputLabel}>Straal (km) voor klussen in de buurt</Text>
          <TextInput
            style={styles.input}
            value={radiusKm}
            onChangeText={setRadiusKm}
            keyboardType="numeric"
          />

          <Text style={styles.inputLabel}>Korte beschrijving</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={bio}
            onChangeText={setBio}
            multiline
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
            <Text style={styles.primaryButtonText}>Opslaan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={onBackHome}>
            <Text style={styles.linkButtonText}>Terug naar overzicht</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------------------- PRIVACYBELEID ---------------------- */

function PrivacyPolicyView({ onBack }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <Text style={styles.screenTitle}>Privacybeleid</Text>
        <Text style={styles.jobDetailDescription}>
          BuurtHelden gaat zorgvuldig om met jouw persoonsgegevens.
          In deze versie van de app worden de gegevens gebruikt om accounts aan te maken,
          klussen te tonen en contact tussen gebruikers mogelijk te maken.
        </Text>

        <Text style={styles.appInfoTitle}>Welke gegevens verwerken we?</Text>
        <Text style={styles.appInfoText}>
          • Naam, e-mailadres en wachtwoord om je account te kunnen beheren.{'\n'}
          • Telefoonnummer zodat opdrachtgever en helper contact met elkaar kunnen opnemen.{'\n'}
          • Gegevens van geplaatste en geaccepteerde klussen (titel, omschrijving, locatie, bedrag).
        </Text>

        <Text style={styles.appInfoTitle}>Grondslag</Text>
        <Text style={styles.appInfoText}>
          We verwerken je gegevens op basis van uitvoering van de overeenkomst
          (het gebruik van de app) en jouw toestemming waar nodig.
        </Text>

        <Text style={styles.appInfoTitle}>Bewaartermijnen</Text>
        <Text style={styles.appInfoText}>
          Gegevens worden bewaard zolang je account actief is of zolang dit nodig is
          voor het afhandelen van klussen en eventuele geschillen.
        </Text>

        <Text style={styles.appInfoTitle}>Delen met derden</Text>
        <Text style={styles.appInfoText}>
          Betaaldiensten zoals Tikkie of banken kunnen eigen gegevens verwerken.
          Raadpleeg altijd ook het privacybeleid van deze aanbieders.
        </Text>

        <Text style={styles.appInfoTitle}>Jouw rechten</Text>
        <Text style={styles.appInfoText}>
          Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen.
          In een productieomgeving worden hiervoor contact- en supportgegevens opgenomen.
        </Text>

        <TouchableOpacity style={styles.linkButton} onPress={onBack}>
          <Text style={styles.linkButtonText}>Terug</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------------- ALGEMENE VOORWAARDEN ---------------------- */

function TermsView({ onBack }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <Text style={styles.screenTitle}>Algemene voorwaarden</Text>
        <Text style={styles.jobDetailDescription}>
          Deze voorwaarden beschrijven in hoofdlijnen hoe BuurtHelden gebruikt kan worden
          voor het plaatsen en uitvoeren van klussen tussen buurtbewoners.
        </Text>

        <Text style={styles.appInfoTitle}>Rol van BuurtHelden</Text>
        <Text style={styles.appInfoText}>
          • BuurtHelden brengt vraag (opdrachtgevers) en aanbod (BuurtHelden) bij elkaar.{'\n'}
          • BuurtHelden is geen werkgever, uitzendbureau of betalingsinstelling.{'\n'}
          • Opdrachtgever en helper maken zelf duidelijke afspraken over inhoud, tijd en vergoeding.
        </Text>

        <Text style={styles.appInfoTitle}>Betaling & platformprovisie</Text>
        <Text style={styles.appInfoText}>
          • De betaling van het klusbedrag vindt plaats tussen opdrachtgever en helper
            (bijvoorbeeld via Tikkie of contant).{'\n'}
          • Over het afgesproken bedrag kan een platformprovisie worden gerekend
            ten gunste van BuurtHelden.{'\n'}
          • In de app kan een koppeling worden gemaakt met een externe betaaldienst.
        </Text>

        <Text style={styles.appInfoTitle}>Veiligheid en gedrag</Text>
        <Text style={styles.appInfoText}>
          • We verwachten dat gebruikers respectvol, zorgvuldig en betrouwbaar handelen.{'\n'}
          • Bij ongewenst gedrag of klachten kan een account worden beperkt of geblokkeerd.{'\n'}
          • Bij (vermoeden van) strafbare feiten neem je contact op met de hulpdiensten.
        </Text>

        <Text style={styles.appInfoTitle}>Aansprakelijkheid</Text>
        <Text style={styles.appInfoText}>
          BuurtHelden kan niet aansprakelijk worden gehouden voor afspraken,
          betalingen of schade die voortkomen uit afspraken tussen gebruikers onderling,
          tenzij anders wettelijk verplicht.
        </Text>

        <Text style={styles.appInfoTitle}>Wijzigingen</Text>
        <Text style={styles.appInfoText}>
          Deze voorwaarden kunnen worden aangepast. Bij belangrijke wijzigingen
          wordt dit binnen de app gecommuniceerd.
        </Text>

        <TouchableOpacity style={styles.linkButton} onPress={onBack}>
          <Text style={styles.linkButtonText}>Terug</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------------- ROOT APP ---------------------- */

export default function App() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [activeScreen, setActiveScreen] = useState('login');
  // login, register, home, newJob, jobDetail, myJobs, profile, privacy, terms
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [userComplaints, setUserComplaints] = useState({});
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setActiveScreen('login');
  };

  // Klachtensysteem: 1 = waarschuwing, 2 of meer = blokkade
  const handleComplaintUser = (email) => {
    if (!email) return { count: 0, blocked: false, warning: false };

    let nextCount = 0;
    let nowBlocked = false;
    let isWarning = false;

    setUserComplaints((prev) => {
      const current = prev[email] || 0;
      nextCount = current + 1;
      if (nextCount === 1) {
        isWarning = true;
      }
      return { ...prev, [email]: nextCount };
    });

    setBlockedUsers((prev) => {
      if (nextCount >= 2 && !prev.includes(email)) {
        nowBlocked = true;
        return [...prev, email];
      }
      return prev;
    });

    return { count: nextCount, blocked: nowBlocked, warning: isWarning };
  };

  if (isLoading) {
    return <SplashView />;
  }

  // Niet ingelogd
  if (!user) {
    if (activeScreen === 'register') {
      return (
        <RegisterView
          onRegisterSuccess={(u) => {
            setUser(u);
            setActiveScreen('home');
          }}
          onGoLogin={() => setActiveScreen('login')}
        />
      );
    }

    if (activeScreen === 'privacy') {
      return <PrivacyPolicyView onBack={() => setActiveScreen('login')} />;
    }

    if (activeScreen === 'terms') {
      return <TermsView onBack={() => setActiveScreen('login')} />;
    }

    return (
      <LoginView
        onLoginSuccess={(u) => {
          setUser(u);
          setActiveScreen('home');
        }}
        onGoRegister={() => setActiveScreen('register')}
        onGoPrivacy={() => setActiveScreen('privacy')}
        onGoTerms={() => setActiveScreen('terms')}
      />
    );
  }

  // Ingelogd router
  if (activeScreen === 'newJob') {
    return (
      <NewJobView
        user={user}
        jobs={jobs}
        setJobs={setJobs}
        onBackHome={() => setActiveScreen('home')}
        blockedUsers={blockedUsers}
      />
    );
  }

  if (activeScreen === 'jobDetail') {
    return (
      <JobDetailView
        user={user}
        jobs={jobs}
        setJobs={setJobs}
        jobId={selectedJobId}
        onBack={() => setActiveScreen('home')}
        userComplaints={userComplaints}
        blockedUsers={blockedUsers}
        onComplaintUser={handleComplaintUser}
      />
    );
  }

  if (activeScreen === 'myJobs') {
    return (
      <MyJobsView
        user={user}
        jobs={jobs}
        onOpenJob={(id) => {
          setSelectedJobId(id);
          setActiveScreen('jobDetail');
        }}
        onBackHome={() => setActiveScreen('home')}
      />
    );
  }

  if (activeScreen === 'profile') {
    return (
      <ProfileView
        user={user}
        setUser={setUser}
        onBackHome={() => setActiveScreen('home')}
      />
    );
  }

  if (activeScreen === 'privacy') {
    return <PrivacyPolicyView onBack={() => setActiveScreen('home')} />;
  }

  if (activeScreen === 'terms') {
    return <TermsView onBack={() => setActiveScreen('home')} />;
  }

  // Default: Home
  return (
    <HomeView
      user={user}
      jobs={jobs}
      onGoNewJob={() => setActiveScreen('newJob')}
      onGoMyJobs={() => setActiveScreen('myJobs')}
      onGoProfile={() => setActiveScreen('profile')}
      onOpenJob={(id) => {
        setSelectedJobId(id);
        setActiveScreen('jobDetail');
      }}
      onLogout={handleLogout}
      blockedUsers={blockedUsers}
    />
  );
}

/* ---------------------- STYLES ---------------------- */

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  splashSafeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  splashTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#E2E8F0',
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#A0AEC0',
    marginRight: 8,
  },
  splashTagline: {
    marginTop: 12,
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  authContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  screenContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  homeContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#E2E8F0',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#A0AEC0',
    marginRight: 8,
  },
  logoIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FBBF24',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    marginRight: 4,
  },
  vehicleLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
  },
  toolLogoBig: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FBBF24',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    marginRight: 6,
  },
  vehicleLogoBig: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
  },
  toolLogoText: {
    fontSize: 18,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E2E8F0',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#CBD5F5',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#2D3748',
    fontSize: 14,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#22C55E',
    borderRadius: 999,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 15,
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#A0AEC0',
    fontSize: 14,
  },
  linkButtonTextBold: {
    color: '#FBBF24',
    fontWeight: '700',
  },
  homeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  homeHeader: {
    flex: 1,
    marginRight: 8,
  },
  homeGreeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  homeSubtitle: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 4,
  },
  homeSubtitleSmall: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  logoutText: {
    color: '#FCA5A5',
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    marginRight: 8,
    borderRadius: 12,
    padding: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E2E8F0',
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 12,
  },
  secondaryButton: {
    flex: 2,
    backgroundColor: '#22C55E',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 14,
  },
  ghostButton: {
    flex: 1.4,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  ghostButtonText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E2E8F0',
    marginTop: 16,
    marginBottom: 8,
  },
  jobCard: {
    backgroundColor: '#111827',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1F2933',
  },
  jobHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E2E8F0',
    flex: 1,
    marginRight: 8,
  },
  jobBudget: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FBBF24',
  },
  jobMeta: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  jobDescription: {
    fontSize: 13,
    color: '#D1D5DB',
    marginTop: 6,
  },
  jobCreatedAt: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 6,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  profileShortcut: {
    marginTop: 20,
    alignItems: 'center',
  },
  profileShortcutText: {
    color: '#FBBF24',
    fontSize: 14,
    fontWeight: '600',
  },
  platformFeeText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E2E8F0',
    marginBottom: 16,
  },
  smallNote: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  jobDetailBudget: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FBBF24',
    marginBottom: 4,
  },
  jobDetailMeta: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  jobDetailDescription: {
    fontSize: 14,
    color: '#E5E7EB',
    marginTop: 4,
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: '#0F766E',
    borderRadius: 10,
    padding: 10,
    marginTop: 16,
  },
  infoBoxOwner: {
    backgroundColor: '#4B5563',
    borderRadius: 10,
    padding: 10,
    marginTop: 16,
  },
  infoBoxBlocked: {
    backgroundColor: '#7F1D1D',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  infoBoxText: {
    fontSize: 13,
    color: '#E2E8F0',
  },
  complaintButton: {
    marginTop: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#F97316',
    paddingVertical: 10,
    alignItems: 'center',
  },
  complaintButtonSecondary: {
    marginTop: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FB923C',
    paddingVertical: 10,
    alignItems: 'center',
  },
  complaintButtonText: {
    color: '#FDBA74',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    marginTop: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#DC2626',
    paddingVertical: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FCA5A5',
    fontWeight: '600',
    fontSize: 14,
  },
  appInfoContainer: {
    marginTop: 24,
  },
  appInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  appInfoText: {
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 8,
  },
  tikkieRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tikkieButton: {
    backgroundColor: '#22C55E',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  tikkieButtonDisabled: {
    opacity: 0.5,
  },
  tikkieButtonText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 13,
  },
  legalLinksRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legalLinkText: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'underline',
  },
  legalDot: {
    fontSize: 12,
    color: '#6B7280',
    marginHorizontal: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgePaid: {
    backgroundColor: '#22C55E',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgePaidText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  reopenButton: {
    marginTop: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
  },
  reopenButtonText: {
    color: '#BFDBFE',
    fontWeight: '600',
    fontSize: 14,
  },
});