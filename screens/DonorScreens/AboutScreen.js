import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/styles";

function AboutScreen() {
  return (
    <LinearGradient
      colors={[Colors.primaryOne, Colors.primaryTwo]}
      style={styles.rootContainer}
    >
      <View style={styles.textContainer}>
        <Text style={styles.intro}>
          الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا
          وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ
          عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ
        </Text>
        <View>
          <Text style={styles.batch}>
            Software Engineering Batch_4 Final Year Project
          </Text>
          <Text style={styles.designed}>Designed by:</Text>
          <Text style={styles.names}>
            Muzafar Salah - Musab Khalid - Al-Shymaa Omer
          </Text>
          <Text style={styles.designed}>SUPERVISOR PREPARED BY:</Text>
          <Text style={styles.names}>DR. NAGI ISHAG MOHAMMED</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    textAlign: "center",
  },
  intro: {
    fontSize: 24,
    textAlign: "center",
    color: "#fff",
    position: "absolute",
    top: -120,
    left: -12,
  },
  batch: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 14,
  },
  designed: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 12,
  },
  names: {
    fontSize: 17,
    textAlign: "center",
    color: "#fff",
    marginVertical: 12,
  },
});
