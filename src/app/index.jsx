import { SymbolView } from 'expo-symbols';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';

const blue = '#0863f7';
const blueDark = '#063a9b';
const navy = '#071b4d';
const ink = '#182957';
const muted = '#74819c';
const surface = '#ffffff';
const page = '#f5f8ff';
const line = '#e5ebf5';
const green = '#16a36d';
const red = '#dc3f48';
const amber = '#f4a629';

const jobs = [
  ['09:00 AM', 'Installation', 'Muzammil Ahmed', 'Jumeirah 2, Dubai', 'In Progress', 'amber'],
  ['11:00 AM', 'Preventive Service', 'Rashid Ali', 'Al Barsha, Dubai', 'Upcoming', 'blue'],
  ['01:00 PM', 'Complaint - No Water', 'Sajid Hussain', 'Dubai Marina', 'Upcoming', 'blue'],
  ['03:00 PM', 'Filter Replacement', 'Imran Yousuf', 'Business Bay, Dubai', 'Upcoming', 'blue'],
  ['05:00 PM', 'Relocation', 'Faisal Khan', 'Deira, Dubai', 'Upcoming', 'blue'],
];

const customers = [
  ['Muzammil Ahmed', '+971 50 123 4567', 'Jumeirah 2, Dubai'],
  ['Rashid Ali', '+971 55 987 6543', 'Al Barsha, Dubai'],
  ['Sajid Hussain', '+971 52 456 7890', 'Dubai Marina'],
  ['Imran Yousuf', '+971 54 321 0987', 'Business Bay, Dubai'],
  ['Faisal Khan', '+971 56 789 0123', 'Deira, Dubai'],
];

const parts = [
  ['RO Membrane', '12 Pcs', 'drop.fill'],
  ['Carbon Filter', '20 Pcs', 'line.3.horizontal.decrease.circle'],
  ['Sediment Filter', '25 Pcs', 'shippingbox.fill'],
  ['UV Lamp', '10 Pcs', 'lightbulb.fill'],
  ['Post Carbon Filter', '15 Pcs', 'line.3.horizontal.decrease.circle.fill'],
  ['Spun Filter', '30 Pcs', 'cylinder.fill'],
];

const screenNames = [
  ['Login', 'Login'],
  ['Dashboard', 'Dashboard'],
  ["Today's Tasks", 'Tasks'],
  ['Task Details', 'Details'],
  ['Start Job', 'Start'],
  ['Complete Job', 'Complete'],
  ['Pending Tasks', 'Pending'],
  ['My Schedule', 'Schedule'],
  ['Customers', 'Customers'],
  ['Inventory', 'Inventory'],
  ['Profile', 'Profile'],
  ['Driver Dashboard', 'Driver'],
];

const fadeInKF = new Keyframe({
  0: { opacity: 0, transform: [{ translateY: -20 }] },
  100: { opacity: 1, transform: [{ translateY: 0 }] },
});

const slideUpKF = new Keyframe({
  0: { opacity: 0, transform: [{ translateY: 30 }] },
  100: { opacity: 1, transform: [{ translateY: 0 }] },
});

const sheetKF = new Keyframe({
  0: { transform: [{ translateY: Dimensions.get('window').height }] },
  100: { transform: [{ translateY: 0 }] },
});

export default function TechnicianApp() {
  const [screen, setScreen] = useState('Login');
  const [moreOpen, setMoreOpen] = useState(false);
  const view = useMemo(() => {
    const props = { go: setScreen, onMorePress: () => setMoreOpen(true) };

    switch (screen) {
      case 'Dashboard':
        return <Dashboard {...props} />;
      case "Today's Tasks":
        return <Tasks {...props} />;
      case 'Task Details':
        return <TaskDetails {...props} />;
      case 'Start Job':
        return <StartJob {...props} />;
      case 'Complete Job':
        return <CompleteJob {...props} />;
      case 'Pending Tasks':
        return <PendingTasks {...props} />;
      case 'My Schedule':
        return <Schedule {...props} />;
      case 'Customers':
        return <Customers {...props} />;
      case 'Inventory':
        return <Inventory {...props} />;
      case 'Profile':
        return <Profile {...props} />;
      case 'Driver Dashboard':
        return <DriverDashboard {...props} />;
      default:
        return <Login go={setScreen} />;
    }
  }, [screen]);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        {view}
      </SafeAreaView>
      <MoreSheet visible={moreOpen} onClose={() => setMoreOpen(false)} go={setScreen} />
    </View>
  );
}

function Login({ go }) {
  return (
    <View style={styles.login}>
      <Image
        source={require('@/assets/loginbg.avif')}
        style={styles.loginBg}
        contentFit="cover"
      />
      <View style={styles.loginOverlay} />
      <View style={styles.loginInner}>
        <Animated.View entering={fadeInKF.duration(600)} style={styles.loginHeader}>
          <View style={styles.logo}>
            <Icon ios="drop.fill" android="water_drop" size={42} color="#ffffff" />
          </View>
          <Text style={styles.brand}>RENT RO</Text>
          <Text style={styles.tagline}>Pure Water. Healthy Life.</Text>
        </Animated.View>

        <View style={styles.loginCenter}>
          <Animated.View entering={slideUpKF.duration(600).delay(200)} style={styles.loginCard}>
            <Text style={styles.loginTitle}>Technician / Driver Login</Text>
            <Input icon="phone.fill" placeholder="Enter mobile number" keyboardType="phone-pad" />
            <Input icon="lock.fill" placeholder="Enter password" secureTextEntry />
            <View style={styles.loginMeta}>
              <Text style={styles.remember}>Remember me</Text>
              <Text style={styles.link}>Forgot Password?</Text>
            </View>
            <PrimaryButton label="Login" icon="arrow.right" onPress={() => go('Dashboard')} />
          </Animated.View>
        </View>

        <View style={styles.waveWrap}>
          <View style={styles.waveBack} />
          <View style={styles.waveFront} />
          <Text style={styles.version}>Version 2.0.1</Text>
        </View>
      </View>
    </View>
  );
}

function Dashboard({ go, onMorePress }) {
  return (
    <AppScreen active="Dashboard" go={go} onMorePress={onMorePress}>
      <Header go={go} />
      <View style={styles.metrics}>
        <Metric label="Today's Tasks" value="5" icon="calendar" />
        <Metric label="Completed" value="2" icon="checkmark.circle.fill" />
        <Metric label="Pending" value="3" icon="clock.fill" />
      </View>

      <View style={styles.quickGrid}>
        <QuickTile label="Installations" value="2" icon="wrench.and.screwdriver.fill" onPress={() => go("Today's Tasks")} />
        <QuickTile label="Services" value="2" icon="briefcase.fill" onPress={() => go('Pending Tasks')} />
        <QuickTile label="Complaints" value="1" icon="exclamationmark.bubble.fill" onPress={() => go('Customers')} />
      </View>

      <Card>
        <SectionTitle title="Today's First Task" action="Details" onPress={() => go('Task Details')} />
        <TaskCard job={jobs[0]} onPress={() => go('Task Details')} />
      </Card>

      <View style={styles.actionRow}>
        <ActionPill label="Schedule" icon="calendar.badge.clock" onPress={() => go('My Schedule')} />
        <ActionPill label="Customers" icon="person.2.fill" onPress={() => go('Customers')} />
        <ActionPill label="Driver" icon="truck.box.fill" onPress={() => go('Driver Dashboard')} />
      </View>

      <PrimaryButton label="View My Schedule" icon="calendar" onPress={() => go('My Schedule')} />
    </AppScreen>
  );
}

function Tasks({ go, onMorePress }) {
  return (
    <AppScreen title="Today's Tasks" subtitle="15 Jun 2026" active="Tasks" go={go} onMorePress={onMorePress}>
      <Segments labels={['All (5)', 'Installation (2)', 'Service (2)', 'Complaint (1)']} />
      <View style={styles.timeline}>
        {jobs.map((job) => (
          <View key={job[1]} style={styles.timelineRow}>
            <Text style={styles.time}>{job[0]}</Text>
            <TaskCard job={job} onPress={() => go('Task Details')} />
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

function TaskDetails({ go, onMorePress }) {
  return (
    <AppScreen title="Task Details" active="Tasks" go={go} onMorePress={onMorePress}>
      <JobBadge />
      <Card>
        <Info label="Customer" value="Muzammil Ahmed" />
        <Info label="Mobile" value="+971 50 123 4567" icon="phone.fill" />
        <Info label="Address" value="Jumeirah 2, Villa 25, Dubai" icon="location.fill" />
        <Info label="Preferred Time" value="09:00 AM - 11:00 AM" />
        <Info label="Asset / Product" value="RO Elite 8 Stage" />
        <Info label="Priority" value="High" danger />
        <Info label="Description" value="New installation with standard accessories and first service included." />
        <Info label="Customer Notes" value="Please call before coming." />
      </Card>
      <PrimaryButton label="Start Job" icon="play.fill" onPress={() => go('Start Job')} />
    </AppScreen>
  );
}

function StartJob({ go, onMorePress }) {
  return (
    <AppScreen title="Start Job" active="Tasks" go={go} onMorePress={onMorePress}>
      <JobBadge />
      <Card>
        <SectionTitle title="Before You Start" subtitle="Please confirm the following:" />
        <Check label="Reached customer location" />
        <Check label="Customer is available" />
        <Check label="Tools and parts available" />
      </Card>
      <Signature title="Capture Customer Signature" />
      <PhotoStrip title="Add Photo (Optional)" />
      <PrimaryButton label="Start Job" icon="play.fill" onPress={() => go('Complete Job')} />
    </AppScreen>
  );
}

function CompleteJob({ go, onMorePress }) {
  return (
    <AppScreen title="Complete Job" active="Tasks" go={go} onMorePress={onMorePress}>
      <JobBadge />
      <Card>
        <SectionTitle title="Job Summary" />
        <SelectRow label="Work Done" value="Installation Completed" />
        <SelectRow label="Parts Used" value="3 Items" />
        <SelectRow label="Time Taken" value="1 h 45 min" />
        <Text style={styles.label}>Customer Feedback</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon key={star} ios={star === 5 ? 'star' : 'star.fill'} android="star" size={26} color={star === 5 ? '#b9c2d2' : blue} />
          ))}
        </View>
        <Text style={styles.ratingText}>Good</Text>
      </Card>
      <Signature title="Customer Signature" />
      <PhotoStrip title="Add Photos" />
      <PrimaryButton label="Complete Job" icon="checkmark.circle.fill" onPress={() => go('Dashboard')} />
    </AppScreen>
  );
}

function PendingTasks({ go, onMorePress }) {
  return (
    <AppScreen title="Pending Tasks" active="Tasks" go={go} onMorePress={onMorePress}>
      <Segments labels={['Pending (3)', 'Overdue (2)']} />
      <Card compact>
        {jobs.slice(1).map((job) => (
          <TaskCard key={job[1]} job={job} compact onPress={() => go('Task Details')} />
        ))}
      </Card>
    </AppScreen>
  );
}

function Schedule({ go, onMorePress }) {
  return (
    <AppScreen title="My Schedule" subtitle="15 Jun - 21 Jun 2026" active="Tasks" go={go} onMorePress={onMorePress}>
      <View style={styles.week}>
        {['Sun\n15', 'Mon\n16', 'Tue\n17', 'Wed\n18', 'Thu\n19', 'Fri\n20', 'Sat\n21'].map((day, index) => (
          <View key={day} style={[styles.day, index === 0 && styles.dayActive]}>
            <Text style={[styles.dayText, index === 0 && styles.dayTextActive]}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.timeline}>
        {jobs.map((job) => (
          <View key={job[1]} style={styles.timelineRow}>
            <Text style={styles.time}>{job[0]}</Text>
            <TaskCard job={job} onPress={() => go('Task Details')} />
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

function Customers({ go, onMorePress }) {
  return (
    <AppScreen title="Customers" active="More" go={go} onMorePress={onMorePress}>
      <View style={styles.search}>
        <Icon ios="magnifyingglass" android="search" size={18} color={muted} />
        <TextInput placeholder="Search customers..." placeholderTextColor="#9aa6bd" style={styles.searchInput} />
        <Icon ios="line.3.horizontal.decrease.circle" android="filter_list" size={20} color={navy} />
      </View>
      <Card compact>
        {customers.map(([name, phone, place]) => (
          <View key={name} style={styles.customerRow}>
            <Avatar initials={initials(name)} />
            <View style={styles.flex}>
              <Text style={styles.itemTitle}>{name}</Text>
              <Text style={styles.itemMeta}>{phone}</Text>
              <Text style={styles.itemMeta}>{place}</Text>
            </View>
            <Badge label="Active" tone="green" />
          </View>
        ))}
      </Card>
    </AppScreen>
  );
}

function Inventory({ go, onMorePress }) {
  return (
    <AppScreen title="My Inventory" active="Inventory" go={go} onMorePress={onMorePress}>
      <Segments labels={['Van Inventory', 'Warehouse']} />
      <Card>
        <SectionTitle title="Van 01 - Toyota Hiace" />
        {parts.map(([name, count, icon]) => (
          <View key={name} style={styles.partRow}>
            <View style={styles.iconBox}>
              <Icon ios={icon} android="inventory_2" size={20} color={blue} />
            </View>
            <Text style={styles.partName}>{name}</Text>
            <Text style={styles.partCount}>{count}</Text>
          </View>
        ))}
      </Card>
      <PrimaryButton label="Request Parts" icon="plus.circle.fill" />
    </AppScreen>
  );
}

function Profile({ go, onMorePress }) {
  return (
    <AppScreen active="More" go={go} onMorePress={onMorePress}>
      <View style={styles.profileHead}>
        <Avatar initials="AK" large />
        <View style={styles.flex}>
          <Text style={styles.profileName}>Ahmed Khan <Text style={styles.rating}>* 4.8</Text></Text>
          <Text style={styles.itemMeta}>Technician ID: TECH-1256</Text>
          <Badge label="Online" tone="green" />
        </View>
      </View>

      <Card>
        <Info label="Mobile Number" value="+971 50 123 4567" icon="phone.fill" />
        <Info label="Email" value="ahmed.khan@rentro.ae" icon="envelope.fill" />
        <Info label="Vehicle" value="Van 01 - Toyota Hiace" icon="car.fill" />
        <Info label="License No." value="7845123" icon="doc.text.fill" />
        <Info label="Experience" value="4 Years" icon="seal.fill" />
        <Info label="Joining Date" value="12 Jan 2023" icon="calendar" />
      </Card>

      <Card>
        <SectionTitle title="All Screens" subtitle="Quick access while building the app" />
        <View style={styles.screenGrid}>
          {screenNames.map(([target, label]) => (
            <Pressable key={target} onPress={() => go(target)} style={styles.screenButton}>
              <Text style={styles.screenButtonText}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Pressable onPress={() => go('Login')} style={styles.logout}>
        <Icon ios="rectangle.portrait.and.arrow.right" android="logout" size={18} color={red} />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </AppScreen>
  );
}

function DriverDashboard({ go, onMorePress }) {
  return (
    <AppScreen active="Dashboard" go={go} driver onMorePress={onMorePress}>
      <Header go={go} driver />
      <View style={styles.metrics}>
        <Metric label="Today's Deliveries" value="4" icon="shippingbox.fill" />
        <Metric label="Completed" value="2" icon="checkmark.circle.fill" />
        <Metric label="Pending" value="2" icon="clock.fill" />
      </View>
      <Card>
        <SectionTitle title="Vehicle" />
        <Info label="Assigned Van" value="Van 02 - Nissan Urvan" icon="car.fill" />
      </Card>
      <Card>
        <SectionTitle title="Today's First Delivery" />
        <TaskCard job={['10:00 AM', 'Order #ORD-1260', 'Al Barsha, Dubai', '', 'Upcoming', 'blue']} />
      </Card>
      <PrimaryButton label="View Deliveries" icon="shippingbox.fill" onPress={() => go("Today's Tasks")} />
    </AppScreen>
  );
}

function MoreSheet({ visible, onClose, go }) {
  if (!visible) return null;

  const screens = [
    ['Dashboard', 'Dashboard', 'house.fill'],
    ["Today's Tasks", 'Tasks', 'clipboard.fill'],
    ['Task Details', 'Details', 'doc.text.fill'],
    ['Start Job', 'Start', 'play.fill'],
    ['Complete Job', 'Complete', 'checkmark.circle.fill'],
    ['Pending Tasks', 'Pending', 'clock.fill'],
    ['My Schedule', 'Schedule', 'calendar'],
    ['Customers', 'Customers', 'person.2.fill'],
    ['Inventory', 'Inventory', 'archivebox.fill'],
    ['Profile', 'Profile', 'person.crop.circle'],
    ['Driver Dashboard', 'Driver', 'truck.box.fill'],
  ];

  return (
    <Animated.View style={styles.moreOverlay}>
      <Pressable style={styles.moreBackdrop} onPress={onClose} />
      <Animated.View entering={sheetKF.duration(400)} style={styles.moreSheet}>
        <View style={styles.moreHandle} />
        <Text style={styles.moreTitle}>All Screens</Text>
        <View style={styles.moreGrid}>
          {screens.map(([label, target, icon]) => (
            <Pressable
              key={target}
              onPress={() => { go(target); onClose(); }}
              style={styles.moreItem}
            >
              <View style={styles.moreIconBox}>
                <Icon ios={icon} android="apps" size={22} color={blue} />
              </View>
              <Text style={styles.moreItemText}>{label}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={() => { go('Login'); onClose(); }} style={styles.moreLogout}>
          <Icon ios="rectangle.portrait.and.arrow.right" android="logout" size={18} color={red} />
          <Text style={styles.moreLogoutText}>Logout</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

function AppScreen({ children, title, subtitle, active, go, driver, onMorePress }) {
  return (
    <View style={styles.screen}>
      {title ? (
        <View style={styles.topBar}>
          <Pressable onPress={() => go('Dashboard')} style={styles.iconButton}>
            <Icon ios="chevron.left" android="arrow_back" size={22} color={navy} />
          </Pressable>
          <View style={styles.topTitleWrap}>
            <Text style={styles.topTitle}>{title}</Text>
            {subtitle ? <Text style={styles.topSubtitle}>{subtitle}</Text> : null}
          </View>
          <Pressable onPress={() => go('Profile')} style={styles.iconButton}>
            <Icon ios="person.crop.circle" android="account_circle" size={22} color={navy} />
          </Pressable>
        </View>
      ) : null}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
      <BottomNav active={active} go={go} driver={driver} onMorePress={onMorePress} />
    </View>
  );
}

function Header({ go, driver }) {
  const name = driver ? 'Ali Hassan' : 'Ahmed Khan';
  const detail = driver ? 'Driver ID: DRV-1025' : 'Technician ID: TECH-1256';
  return (
    <View style={styles.header}>
      <Avatar initials={initials(name)} large />
      <View style={styles.flex}>
        <Text style={styles.greeting}>Good Morning,</Text>
        <Text style={styles.personName}>{name}</Text>
        <Text style={styles.itemMeta}>{detail}</Text>
        <Badge label="Online" tone="green" />
      </View>
      <Pressable onPress={() => go('Profile')} style={styles.bell}>
        <Icon ios="bell.fill" android="notifications" size={22} color={navy} />
        <View style={styles.dot} />
      </Pressable>
    </View>
  );
}

function BottomNav({ active, go, driver, onMorePress }) {
  const items = driver
    ? [
        ['Dashboard', 'Dashboard', 'house.fill', 'home'],
        ['Deliveries', "Today's Tasks", 'shippingbox.fill', 'local_shipping'],
        ['Inventory', 'Inventory', 'archivebox.fill', 'inventory_2'],
        ['Alerts', 'Pending Tasks', 'bell.fill', 'notifications'],
        ['More', null, 'ellipsis.circle.fill', 'more_horiz'],
      ]
    : [
        ['Dashboard', 'Dashboard', 'house.fill', 'home'],
        ['Tasks', "Today's Tasks", 'clipboard.fill', 'assignment'],
        ['Inventory', 'Inventory', 'archivebox.fill', 'inventory_2'],
        ['Customers', 'Customers', 'person.2.fill', 'groups'],
        ['More', null, 'ellipsis.circle.fill', 'more_horiz'],
      ];

  return (
    <View style={styles.bottomNav}>
      {items.map(([label, target, ios, android]) => {
        const selected = active === label || (label === 'Customers' && active === 'More');
        return (
          <Pressable
            key={label}
            onPress={() => (label === 'More' ? onMorePress?.() : go(target))}
            style={styles.navItem}
          >
            <Icon ios={ios} android={android} size={22} color={selected ? blue : '#66728c'} />
            <Text style={[styles.navLabel, selected && styles.navLabelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Icon({ ios, android, size = 20, color = blue }) {
  return <SymbolView name={{ ios, android, web: android || ios }} size={size} tintColor={color} />;
}

function Input({ icon, ...props }) {
  return (
    <View style={styles.inputWrap}>
      <Icon ios={icon} android={icon.includes('lock') ? 'lock' : 'phone'} size={18} color="#9aa6bd" />
      <TextInput placeholderTextColor="#9aa6bd" style={styles.input} {...props} />
    </View>
  );
}

function PrimaryButton({ label, icon, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.primary, pressed && styles.pressed]}>
      {icon ? <Icon ios={icon} android={icon.includes('check') ? 'check_circle' : icon.includes('play') ? 'play_arrow' : 'arrow_forward'} size={18} color="#fff" /> : null}
      <Text style={styles.primaryText}>{label}</Text>
    </Pressable>
  );
}

function Metric({ label, value, icon }) {
  return (
    <View style={styles.metric}>
      <Icon ios={icon} android="assignment" size={20} color={blue} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function QuickTile({ label, value, icon, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.quickTile}>
      <View style={styles.iconCircle}>
        <Icon ios={icon} android="build" size={22} color={blue} />
      </View>
      <Text style={styles.quickValue}>{value}</Text>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

function ActionPill({ label, icon, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.actionPill}>
      <Icon ios={icon} android="apps" size={17} color={blue} />
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

function Card({ children, compact }) {
  return <View style={[styles.card, compact && styles.cardCompact]}>{children}</View>;
}

function SectionTitle({ title, subtitle, action, onPress }) {
  return (
    <View style={styles.sectionHead}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSub}>{subtitle}</Text> : null}
      </View>
      {action ? (
        <Pressable onPress={onPress}>
          <Text style={styles.link}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function Segments({ labels }) {
  return (
    <View style={styles.segments}>
      {labels.map((label, index) => (
        <View key={label} style={[styles.segment, index === 0 && styles.segmentActive]}>
          <Text style={[styles.segmentText, index === 0 && styles.segmentTextActive]}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

function TaskCard({ job, compact, onPress }) {
  const [time, title, customer, place, status, tone] = job;
  return (
    <Pressable onPress={onPress} style={[styles.taskCard, compact && styles.taskCompact]}>
      <View style={styles.flex}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemMeta}>{customer}</Text>
        {place ? <Text style={styles.itemMeta}>{place}</Text> : null}
      </View>
      <View style={styles.taskRight}>
        {compact ? <Text style={styles.timeSmall}>{time}</Text> : null}
        <Badge label={status} tone={tone} />
      </View>
    </Pressable>
  );
}

function Badge({ label, tone }) {
  const toneStyle = tone === 'green' ? styles.badgeGreen : tone === 'amber' ? styles.badgeAmber : styles.badgeBlue;
  const textStyle = tone === 'green' ? styles.badgeTextGreen : tone === 'amber' ? styles.badgeTextAmber : styles.badgeTextBlue;
  return (
    <View style={[styles.badge, toneStyle]}>
      <Text style={[styles.badgeText, textStyle]}>{label}</Text>
    </View>
  );
}

function JobBadge() {
  return (
    <View style={styles.jobBadge}>
      <Badge label="Installation" tone="green" />
      <Text style={styles.orderId}>#ORD-1258</Text>
    </View>
  );
}

function Info({ label, value, icon, danger }) {
  return (
    <View style={styles.infoRow}>
      {icon ? <Icon ios={icon} android="info" size={17} color={muted} /> : null}
      <View style={styles.flex}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.infoValue, danger && styles.danger]}>{value}</Text>
      </View>
    </View>
  );
}

function Check({ label }) {
  return (
    <View style={styles.checkRow}>
      <Icon ios="checkmark.seal.fill" android="check_circle" size={20} color={green} />
      <Text style={styles.checkText}>{label}</Text>
      <Icon ios="checkmark.circle.fill" android="check_circle" size={20} color={green} />
    </View>
  );
}

function SelectRow({ label, value }) {
  return (
    <View style={styles.selectGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.select}>
        <Text style={styles.selectValue}>{value}</Text>
        <Icon ios="chevron.down" android="expand_more" size={18} color={muted} />
      </View>
    </View>
  );
}

function Signature({ title }) {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.signature}>
        <View style={styles.sigOne} />
        <View style={styles.sigTwo} />
      </View>
    </View>
  );
}

function PhotoStrip({ title }) {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.photos}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.photo}>
            <Icon ios="drop.fill" android="water_drop" size={24} color={blue} />
            <Text style={styles.photoText}>RO</Text>
          </View>
        ))}
        <View style={styles.photoAdd}>
          <Icon ios="plus" android="add" size={26} color={blue} />
        </View>
      </View>
    </View>
  );
}

function Avatar({ initials: text, large }) {
  return (
    <View style={[styles.avatar, large && styles.avatarLarge]}>
      <Text style={[styles.avatarText, large && styles.avatarTextLarge]}>{text}</Text>
    </View>
  );
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: page,
  },
  screen: {
    flex: 1,
    backgroundColor: page,
  },
  content: {
    padding: 18,
    paddingBottom: 98,
    gap: 15,
  },
  flex: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
  login: {
    flex: 1,
  },
  loginBg: {
    ...StyleSheet.absoluteFillObject,
  },
  loginOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 27, 77, 0.55)',
  },
  loginInner: {
    flex: 1,
    paddingHorizontal: 24,
  },
  loginCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  loginHeader: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 86,
    height: 86,
    borderRadius: 28,
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
  },
  brand: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 18,
  },
  tagline: {
    color: '#b3d9ff',
    fontSize: 13,
    fontWeight: '600',
  },
  loginCard: {
    gap: 14,
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  loginTitle: {
    color: navy,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },
  inputWrap: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dce3ef',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    color: ink,
    fontSize: 14,
    fontWeight: '700',
  },
  loginMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  remember: {
    color: ink,
    fontSize: 12,
    fontWeight: '600',
  },
  link: {
    color: blue,
    fontSize: 12,
    fontWeight: '700',
  },
  primary: {
    height: 52,
    borderRadius: 12,
    backgroundColor: blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: blue,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  primaryText: {
    color: surface,
    fontWeight: '700',
    fontSize: 15,
  },
  pressed: {
    opacity: 0.8,
  },
  waveWrap: {
    height: 92,
    justifyContent: 'flex-end',
  },
  waveBack: {
    position: 'absolute',
    left: -40,
    right: -40,
    bottom: -32,
    height: 92,
    borderRadius: 52,
    backgroundColor: 'rgba(216, 243, 255, 0.2)',
  },
  waveFront: {
    position: 'absolute',
    left: -30,
    right: -30,
    bottom: -52,
    height: 96,
    borderRadius: 54,
    backgroundColor: 'rgba(189, 234, 255, 0.3)',
  },
  version: {
    color: '#a0b4cc',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 34,
  },
  topBar: {
    height: 58,
    paddingHorizontal: 14,
    backgroundColor: surface,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: line,
    borderBottomWidth: 1,
  },
  topTitleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  topTitle: {
    color: navy,
    fontSize: 17,
    fontWeight: '700',
  },
  topSubtitle: {
    color: muted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  iconButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  greeting: {
    color: muted,
    fontSize: 13,
    fontWeight: '600',
  },
  personName: {
    color: navy,
    fontSize: 18,
    fontWeight: '700',
  },
  itemMeta: {
    color: muted,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
  bell: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    right: 8,
    top: 7,
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: red,
    borderWidth: 1,
    borderColor: surface,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#d9efff',
    borderColor: '#8ed2ff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarText: {
    color: navy,
    fontSize: 14,
    fontWeight: '700',
  },
  avatarTextLarge: {
    fontSize: 19,
  },
  metrics: {
    flexDirection: 'row',
    gap: 10,
  },
  metric: {
    flex: 1,
    minHeight: 96,
    backgroundColor: surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: line,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  metricValue: {
    color: navy,
    fontSize: 25,
    fontWeight: '700',
  },
  metricLabel: {
    color: ink,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  quickTile: {
    flex: 1,
    minHeight: 112,
    backgroundColor: surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: line,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#eaf3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickValue: {
    color: navy,
    fontSize: 19,
    fontWeight: '700',
  },
  quickLabel: {
    color: ink,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    backgroundColor: surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: line,
    padding: 14,
    gap: 10,
    shadowColor: '#1b3765',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardCompact: {
    padding: 0,
    overflow: 'hidden',
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  sectionTitle: {
    color: navy,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionSub: {
    color: muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 9,
  },
  actionPill: {
    flex: 1,
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: surface,
    borderWidth: 1,
    borderColor: line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionText: {
    color: navy,
    fontSize: 12,
    fontWeight: '700',
  },
  segments: {
    flexDirection: 'row',
    backgroundColor: '#eaf0fa',
    borderRadius: 8,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    minHeight: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  segmentActive: {
    backgroundColor: blue,
  },
  segmentText: {
    color: navy,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  segmentTextActive: {
    color: surface,
  },
  timeline: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: 'row',
    borderBottomColor: line,
    borderBottomWidth: 1,
  },
  time: {
    width: 74,
    paddingTop: 14,
    color: navy,
    fontSize: 12,
    fontWeight: '700',
  },
  taskCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 13,
  },
  taskCompact: {
    paddingHorizontal: 14,
    borderBottomColor: '#eef3fa',
    borderBottomWidth: 1,
  },
  taskRight: {
    alignItems: 'flex-end',
    gap: 7,
  },
  itemTitle: {
    color: navy,
    fontSize: 14,
    fontWeight: '700',
  },
  timeSmall: {
    color: navy,
    fontSize: 11,
    fontWeight: '700',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeBlue: {
    backgroundColor: '#eaf3ff',
  },
  badgeGreen: {
    backgroundColor: '#e7f8f0',
  },
  badgeAmber: {
    backgroundColor: '#fff3dc',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextBlue: {
    color: blue,
  },
  badgeTextGreen: {
    color: green,
  },
  badgeTextAmber: {
    color: amber,
  },
  jobBadge: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: line,
    borderRadius: 8,
    backgroundColor: surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  orderId: {
    color: navy,
    fontSize: 13,
    fontWeight: '700',
  },
  infoRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: '#eef2f8',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  label: {
    color: navy,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
  },
  infoValue: {
    color: ink,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  danger: {
    color: red,
    fontWeight: '700',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  checkText: {
    flex: 1,
    color: ink,
    fontSize: 13,
    fontWeight: '600',
  },
  selectGroup: {
    gap: 6,
  },
  select: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: line,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectValue: {
    color: ink,
    fontSize: 13,
    fontWeight: '600',
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 2,
  },
  ratingText: {
    color: muted,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  signature: {
    height: 86,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccd7e8',
    backgroundColor: surface,
    overflow: 'hidden',
  },
  sigOne: {
    position: 'absolute',
    left: 44,
    top: 42,
    width: 176,
    height: 2,
    backgroundColor: '#758198',
    transform: [{ rotate: '-12deg' }],
  },
  sigTwo: {
    position: 'absolute',
    left: 94,
    top: 44,
    width: 152,
    height: 2,
    backgroundColor: '#758198',
    transform: [{ rotate: '10deg' }],
  },
  photos: {
    flexDirection: 'row',
    gap: 10,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderColor: line,
    borderWidth: 1,
    backgroundColor: '#eef7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    color: blue,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  photoAdd: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderColor: line,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: surface,
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    width: 40,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaf0fa',
  },
  dayActive: {
    backgroundColor: blue,
  },
  dayText: {
    color: navy,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 15,
  },
  dayTextActive: {
    color: surface,
  },
  search: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: line,
    backgroundColor: surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  searchInput: {
    flex: 1,
    color: ink,
    fontSize: 13,
    fontWeight: '700',
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    padding: 13,
    borderBottomColor: '#eef3fa',
    borderBottomWidth: 1,
  },
  partRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 11,
    borderBottomColor: '#eef3fa',
    borderBottomWidth: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#eaf3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partName: {
    flex: 1,
    color: navy,
    fontSize: 14,
    fontWeight: '600',
  },
  partCount: {
    color: navy,
    fontSize: 13,
    fontWeight: '700',
  },
  profileHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  profileName: {
    color: navy,
    fontSize: 18,
    fontWeight: '700',
  },
  rating: {
    color: amber,
    fontSize: 12,
  },
  screenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  screenButton: {
    width: '31.8%',
    minHeight: 40,
    borderRadius: 8,
    backgroundColor: '#eef5ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  screenButtonText: {
    color: navy,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  logout: {
    height: 46,
    borderRadius: 8,
    backgroundColor: '#fff0f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    color: red,
    fontSize: 14,
    fontWeight: '700',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    backgroundColor: surface,
    borderTopColor: line,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  navLabel: {
    color: '#66728c',
    fontSize: 10,
    fontWeight: '700',
  },
  navLabelActive: {
    color: blue,
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  moreBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  moreSheet: {
    backgroundColor: surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  moreHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d0d8e6',
    alignSelf: 'center',
    marginBottom: 16,
  },
  moreTitle: {
    color: navy,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  moreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  moreItem: {
    width: '30%',
    minHeight: 80,
    borderRadius: 12,
    backgroundColor: '#f0f6ff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  moreIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0edff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreItemText: {
    color: navy,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  moreLogout: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#fff0f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  moreLogoutText: {
    color: red,
    fontSize: 14,
    fontWeight: '700',
  },
});
