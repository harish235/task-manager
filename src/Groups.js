import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import fbase from './firebase';
import Team from './Team';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

export default function Groups() {
    const [teamName, setTeamName] = useState('');
    const [teamRole, setTeamRole] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [teams, setTeams] = useState();
    const members = [];
    const teamsFetch = [];
    var uid = fbase.auth().currentUser.uid;


    const userQuerry = async (startsWith = '') => {
        let query = fbase.firestore().collection('users')
        if (startsWith) {
            const end = startsWith.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1),);
            query = query.where('name', '>=', startsWith).where('name', '<', end);
        }
        const result = await query
            .orderBy('name')
            .get().then((querySnapshot) => {
                querySnapshot.forEach((item) => members.push(
                    {
                        id: item.data().id,
                        label: item.data().name,
                        value: item.data().name
                    }
                ))
            });
        return result;
    }

    const getGroups = async () => {
        await fbase.firestore().collection('/groups').get().then((snapshot) => {
            snapshot.forEach(doc => {
                if (doc.data().members.includes(uid)) {
                    //console.log(doc.data().members)
                    teamsFetch.push(doc.data());
                }
            })
            setTeams(teamsFetch);
        }).catch((error) => console.error(error))
    }

    useEffect(() => getGroups(), []);


    const onSubmit = (e) => {
        e.preventDefault();

        const m = teamMembers.map(item => item.id)

        if (!teamName || !teamRole || m == []) {
            alert('Provide all the information about the team');
            return
        }

        const docRef = fbase.firestore().collection('groups').doc();
        docRef.set({
            id: docRef.id,
            name: teamName,
            teamDescription: teamDescription,
            members: m

        })

        setTeamName('');
        setTeamRole('');
        setTeamDescription('');
        setTeamMembers([]);
        getGroups();
    }


    return (
        <div className='groups'>
            <h1>Groups page</h1>
            <Card
        style={{
          width: 400,
          backgroundColor: "yellow",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
          >
            Greetings of the day
          </Typography>
          <Typography variant="h5" component="h2">
            How are you ?
          </Typography>
          <Typography
            style={{
              marginBottom: 12,
            }}
            color="textSecondary"
          >
            Keep Motivated
          </Typography>
          <Typography variant="body2" component="p">
            Stay Happy
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Stay Safe.....</Button>
        </CardActions>
      </Card>
            <div className="groups-form">
                <form className='add-form' onSubmit={onSubmit}>
                    <div className='form-control'>
                        <label>Team Name</label>
                        <input
                            type='text'
                            placeholder='Add team name'
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                    </div>
                    <div className='form-control'>
                        <label>Team Role</label>
                        <input
                            type='text'
                            placeholder='Team Role'
                            value={teamRole}
                            onChange={(e) => setTeamRole(e.target.value)}
                        />
                    </div>
                    <div className='form-control form-control-check'>
                        <label>Team Description</label>
                        <textarea value={teamDescription} onChange={(e) => setTeamDescription(e.target.value)} />
                    </div>

                    <Select options={members} isMulti onChange={opt => setTeamMembers(opt)} onInputChange={userQuerry()}>

                    </Select>
                    <input type='submit' value='Create Team' className='btn btn-block' />
                </form>
            </div>
            <div>
                {teams ? teams.map(team => {
                    return (<Team key={team.id} team={team} />)
                }) : <h3>You're not a member of any team</h3>}
            </div>

        </div>
    )
}
